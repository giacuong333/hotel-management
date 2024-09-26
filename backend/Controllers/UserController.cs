using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using backend.Models;
using backend.Database;
using Microsoft.Extensions.Logging;
using System.Web.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
      [Route("[controller]")]
      [ApiController]
      public class UserController : ControllerBase
      {
            private readonly DatabaseContext _context;
            private readonly ILogger<UserController> _logger;
            private readonly IConfiguration _configuration;

            public UserController(DatabaseContext context, ILogger<UserController> logger, IConfiguration configuration)
            {
                  _context = context;
                  _logger = logger;
                  _configuration = configuration;
            }

            // [GET] /user
            [HttpGet]
            [Produces("application/json")]
            public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers()
            {
                  try
                  {
                        var users = await _context.User.ToListAsync();
                        return Ok(users);
                  }
                  catch (Exception e)
                  {
                        _logger.LogError(e, "Error retrieving users");
                        return StatusCode(500, "Internal server error");
                  }
            }

            // [GET] /user/{id}
            [HttpGet("{id}")]
            [Produces("application/json")]
            public async Task<ActionResult<UserModel>> GetUser(int id)
            {
                  try
                  {
                        var user = await _context.User.FindAsync(id);

                        if (user == null)
                        {
                              return NotFound();
                        }

                        return Ok(user);
                  }
                  catch (Exception e)
                  {
                        _logger.LogError(e, "Error retrieving user");
                        return StatusCode(500, "Internal server error");
                  }
            }

            // [POST] /user/login
            [HttpPost("login")]
            [Produces("application/json")]
            public async Task<ActionResult<UserModel>> Login([FromBody] UserModel value)
            {
                  try
                  {
                        if (!ModelState.IsValid)
                        {
                              return BadRequest(ModelState);
                        }

                        var user = await _context.User.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Email == value.Email);

                        if (user == null)
                        {
                              return NotFound(new { message = "Email does not exist" });
                        }

                        bool isPasswordValid = Crypto.VerifyHashedPassword(user.Password, value.Password);

                        if (!isPasswordValid)
                        {
                              return Unauthorized(new { message = "Password is incorrect" });
                        }

                        // Generate JWT token
                        var jwtKey = _configuration["JwtKey:Key"];

                        // Check if the key is null or empty
                        if (string.IsNullOrEmpty(jwtKey))
                        {
                              throw new ArgumentNullException("JWT signing key is not configured in appsettings.json.");
                        }

                        var tokenHandler = new JwtSecurityTokenHandler();
                        var key = Encoding.ASCII.GetBytes(jwtKey); // Use a stronger secret key

                        if (key.Length < 32)
                        {
                              throw new ArgumentOutOfRangeException(nameof(key), "JWT signing key must be at least 256 bits (32 bytes) long.");
                        }

                        var tokenDescriptor = new SecurityTokenDescriptor
                        {
                              Subject = new ClaimsIdentity(new[]
                              {
                                    new Claim(ClaimTypes.NameIdentifier, $"{user.Id}"), // Use NameIdentifier for user ID
                                    new Claim(ClaimTypes.Name, user.Name) // You can also include the user's name if needed
                              }),
                              Expires = DateTime.UtcNow.AddHours(1),
                              SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                        };

                        var token = tokenHandler.CreateToken(tokenDescriptor);
                        var tokenString = tokenHandler.WriteToken(token);

                        return Ok(new
                        {
                              token = tokenString,
                              user = new
                              {
                                    id = user.Id,
                                    email = user.Email,
                                    name = user.Name,
                                    phoneNumber = user.PhoneNumber,
                                    createdAt = user.CreatedAt,
                                    roleId = user.RoleId,
                                    role = user.Roles
                              }
                        });
                  }
                  catch (Exception e)
                  {
                        _logger.LogError(e, "Error logging in user");
                        return StatusCode(500, "Internal server error");
                  }
            }

            private int GetUserIdFromClaims()
            {
                  var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
                  if (userIdClaim != null)
                  {
                        return int.Parse(userIdClaim.Value); // Ensure this matches the data type of your user ID
                  }
                  throw new UnauthorizedAccessException("User ID not found in claims.");
            }


            // GET /user/profile
            [Authorize]
            [HttpGet("profile")]
            public ActionResult<UserModel> GetProfile()
            {
                  try
                  {
                        var userId = GetUserIdFromClaims();
                        var user = _context.User.Include(u => u.Roles).FirstOrDefault(u => u.Id == userId);

                        if (user == null)
                        {
                              return NotFound();
                        }

                        return Ok(new
                        {
                              user = new
                              {
                                    user.Id,
                                    user.Email,
                                    user.Name,
                                    user.PhoneNumber,
                                    user.CreatedAt,
                                    user.RoleId,
                                    Role = user.Roles // Include the full Role object if necessary
                              }
                        });
                  }
                  catch (UnauthorizedAccessException ex)
                  {
                        return Unauthorized(new { message = ex.Message });
                  }
            }


            // [POST] /user/register
            [HttpPost("register")]
            [Produces("application/json")]
            public async Task<ActionResult> Register([FromBody] UserModel value)
            {
                  try
                  {
                        Console.WriteLine(value);

                        if (!ModelState.IsValid)
                        {
                              return BadRequest(ModelState);
                        }

                        // Check if the email already exists
                        var emailExists = await _context.User.AnyAsync(user => user.Email == value.Email);
                        if (emailExists)
                        {
                              return Conflict(new { message = "Email already exists" }); // 409 Conflict
                        }

                        // Check if the role exists
                        var roleExists = await _context.Role.AnyAsync(role => role.Id == value.RoleId);
                        if (!roleExists)
                        {
                              value.RoleId = 2; // Default role ID, can be moved to a config setting
                        }

                        // Check if the phone number already exists
                        var phoneExists = await _context.User.AnyAsync(user => user.PhoneNumber == value.PhoneNumber);
                        if (phoneExists)
                        {
                              return Conflict(new { message = "Phone number already exists" }); // 409 Conflict
                        }

                        // Hash the password
                        value.Password = Crypto.HashPassword(value.Password);

                        // Set FirstBook flag
                        value.FirstBook = true;

                        var newUser = new UserModel
                        {
                              Name = value.Name,
                              Email = value.Email,
                              PhoneNumber = value.PhoneNumber,
                              Password = value.Password,
                              RoleId = value.RoleId,
                              FirstBook = value.FirstBook,
                              CreatedAt = DateTime.UtcNow
                        };

                        await _context.User.AddAsync(newUser);
                        await _context.SaveChangesAsync();

                        return StatusCode(201, new { message = "Sign up successfully" });
                  }
                  catch (DbUpdateException dbEx)
                  {
                        _logger.LogError(dbEx, "Database update error during user registration");
                        return StatusCode(500, new
                        {
                              error = "A database error occurred while processing the request.",
                              details = dbEx.Message
                        });
                  }
                  catch (Exception ex)
                  {
                        _logger.LogError(ex, "Error registering user");
                        return StatusCode(500, new
                        {
                              error = "An unexpected error occurred while processing the request.",
                              details = ex.Message
                        });
                  }
            }

            // [POST] /user/logout
            [HttpPost("logout")]
            [Produces("application/json")]
            public IActionResult Logout()
            {
                  try
                  {
                        var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");
                        return Ok(new { message = "Logout successful" });
                  }
                  catch (Exception e)
                  {
                        _logger.LogError(e, "Error logging in user");
                        return StatusCode(500, "Internal server error");
                  }
            }
      }
}
