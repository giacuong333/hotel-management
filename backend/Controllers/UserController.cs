using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using backend.Models;
using backend.Database;
using Microsoft.Extensions.Logging;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Web.Helpers;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
      [Route("[controller]")]
      [ApiController]
      public class UserController(DatabaseContext context, ILogger<UserController> logger, IConfiguration configuration) : ControllerBase
      {
            private readonly DatabaseContext _context = context;
            private readonly ILogger<UserController> _logger = logger;
            private readonly IConfiguration _configuration = configuration;

            private bool IsLoggedIn(HttpContext httpContext)
            {
                  if (httpContext.User.Identity is not ClaimsIdentity identity || !identity.IsAuthenticated)
                  {
                        return false;
                  }

                  var userIdClaim = identity.FindFirst(ClaimTypes.NameIdentifier);
                  return userIdClaim != null;
            }

            private int GetUserIdFromClaims(HttpContext httpContext)
            {
                  var identity = httpContext.User.Identity as ClaimsIdentity;
                  var userIdClaim = identity?.FindFirst(ClaimTypes.NameIdentifier);
                  return userIdClaim != null ? int.Parse(userIdClaim.Value) : 0;
            }

            // [GET] /user
            [HttpGet]
            [Produces("application/json")]
            public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers()
            {
                  try
                  {
                        var users = await _context.User
                              .Where(u => u.DeletedAt == null)
                              .Include(u => u.Roles)
                              .ToListAsync();

                        if (users == null)
                        {
                              return NotFound(new { message = "Users not found." });
                        }

                        return Ok(users);
                  }
                  catch (Exception e)
                  {
                        _logger.LogError(e, "Error retrieving users");
                        return StatusCode(500, "Internal server error");
                  }
            }

            // [PUT] /user/password/{id}
            [HttpPut("password/{id}")]
            [Produces("application/json")]
            public async Task<ActionResult<IEnumerable<UserModel>>> ChangePassword(int id, [FromForm] string currentPassword, [FromForm] string newPassword)
            {
                  if (IsLoggedIn(HttpContext))
                  {
                        try
                        {
                              var user = await _context.User.FindAsync(id);
                              if (user == null)
                              {
                                    return Util.NotFoundResponse("User not found");
                              }

                              var passwordMatches = Crypto.VerifyHashedPassword(user.Password, currentPassword);
                              if (!passwordMatches)
                              {
                                    return Util.BadRequestResponse("Current password is incorrect");
                              }

                              var passwordHashed = Crypto.HashPassword(newPassword);
                              user.Password = passwordHashed;

                              _context.User.Update(user);
                              await _context.SaveChangesAsync();

                              return Util.OkResponse("Password changed successfully.");
                        }
                        catch (Exception e)
                        {
                              _logger.LogError(e.Message);
                              return Util.InternalServerErrorResponse("Internal server error");
                        }
                  }
                  else
                  {
                        return Util.UnauthorizedResponse("You are unauthorized");
                  }
            }

            // [GET] /user/{id}
            [HttpGet("{id}")]
            [Produces("application/json")]
            public async Task<ActionResult<UserModel>> GetUserById(int id)
            {
                  try
                  {
                        var user = await _context.User.Where(u => u.DeletedAt == null).Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == id);

                        if (user == null)
                        {
                              return Util.NotFoundResponse("User not found");
                        }

                        return Util.OkResponse(user);
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

                        var user = await _context.User.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Email == value.Email && u.DeletedAt == null);

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
                                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), // Use NameIdentifier for user ID
                                    new Claim(ClaimTypes.Name, user.Name), // You can also include the user's name if needed
                                    new Claim(ClaimTypes.Email, user.Email), // You can also include the user's name if needed
                                    new Claim(ClaimTypes.Role, user.Roles.Name),
                        }),
                              Expires = DateTime.UtcNow.AddHours(1),
                              SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                        };

                        var token = tokenHandler.CreateToken(tokenDescriptor);
                        var tokenString = tokenHandler.WriteToken(token);

                        return Ok(new
                        {
                              token = tokenString,
                              roleId = user.Roles.Id
                        });
                  }
                  catch (Exception e)
                  {
                        _logger.LogError(e, "Error logging in user");
                        return StatusCode(500, "Internal server error");
                  }
            }

            // GET /user/profile
            [Authorize]
            [HttpGet("profile")]
            public ActionResult<UserModel> GetProfile()
            {
                  try
                  {
                        int userId = GetUserIdFromClaims(HttpContext);
                        var user = _context.User.Where(u => u.DeletedAt == null).Include(u => u.Roles).FirstOrDefault(u => u.Id == userId);

                        if (user == null)
                        {
                              return Util.NotFoundResponse("User not found");
                        }

                        return Ok(new
                        {
                              user = new
                              {
                                    user.Id,
                                    user.Email,
                                    user.Name,
                                    user.PhoneNumber,
                                    user.Avatar,
                                    user.Gender,
                                    user.Dob,
                                    user.CreatedAt,
                                    user.RoleId,
                                    Role = user.Roles
                              }
                        });
                  }
                  catch (UnauthorizedAccessException ex)
                  {
                        return Util.UnauthorizedResponse(ex.Message);
                  }
            }

            // [POST] /user/register
            [HttpPost("register")]
            [Produces("application/json")]
            public async Task<ActionResult> Register([FromBody] UserModel value)
            {
                  try
                  {
                        if (!ModelState.IsValid)
                        {
                              return BadRequest(ModelState);
                        }

                        // Check if the email already exists
                        var emailExists = await _context.User.AnyAsync(user => (user.Email == value.Email) && user.DeletedAt == null);
                        if (emailExists)
                        {
                              return Conflict(new { message = "Email already exists" }); // 409 Conflict
                        }

                        // Check if the role exists
                        var roleExists = await _context.Role.AnyAsync(role => role.Id == value.RoleId);
                        if (!roleExists)
                        {
                              value.RoleId = 4; // Default role ID, can be moved to a config setting
                        }

                        // Check if the phone number already exists
                        var phoneExists = await _context.User.AnyAsync(user => user.PhoneNumber == value.PhoneNumber && user.DeletedAt == null);
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
                              Gender = value.Gender,
                              Dob = value.Dob,
                              RoleId = value.RoleId,
                              FirstBook = value.FirstBook,
                              CreatedAt = DateTime.UtcNow
                        };

                        await _context.User.AddAsync(newUser);
                        await _context.SaveChangesAsync();

                        return StatusCode(201, new { message = "Sign up successfully", newUser });
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

            // [DELETE] /user/{id}
            [HttpDelete("{id}")]
            public async Task<ActionResult<IEnumerable<UserModel>>> SoftDeleteUserById(int id)
            {
                  try
                  {
                        var claimsIdentity = User.Identity as ClaimsIdentity;
                        if (claimsIdentity == null)
                        {
                              return Unauthorized("User identity is null.");
                        }

                        var userIdClaim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
                        if (userIdClaim == null)
                        {
                              return Unauthorized("User ID claim is missing.");
                        }

                        int loggingInId;
                        try
                        {
                              loggingInId = int.Parse(userIdClaim.Value);
                        }
                        catch (Exception e)
                        {
                              return BadRequest("Invalid User ID in the claim.");
                        }

                        var userRoleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);
                        if (userRoleClaim != null && userRoleClaim.Value == "Manager")
                        {
                              Console.WriteLine("User is a Manager, skipping deletion.");
                        }

                        var user = await _context.User.FindAsync(id);

                        if (user == null)
                        {
                              return NotFound(new { message = "User not found." });
                        }

                        if (user.RoleId == 1)
                        {
                              return StatusCode(403, new { message = "This user must not be deleted." });
                        }

                        if (user.Id == loggingInId)
                        {
                              return StatusCode(403, new { message = "You can not delete yourself." });
                        }

                        user.DeletedAt = DateTime.UtcNow;

                        await _context.SaveChangesAsync();

                        return Ok(new { message = "User deleted successfully" });
                  }
                  catch (Exception e)
                  {
                        Console.WriteLine(e);
                        return StatusCode(500, "Internal server error");
                  }
            }

            // [DELETE] /user/customer/{id}
            [HttpDelete("customer/{id}")]
            public async Task<ActionResult> SoftDeleteCustomerById(int id)
            {
                  try
                  {
                        var user = await _context.User.FindAsync(id);
                        if (user == null)
                        {
                              return Util.NotFoundResponse("User not found");
                        }

                        user.DeletedAt = DateTime.UtcNow;

                        _context.User.Update(user);
                        var result = await _context.SaveChangesAsync();
                        if (result == 0)
                        {
                              _logger.LogError("No changes were saved to the database.");
                        }

                        return Util.OkResponse("Your account is deleted!");
                  }
                  catch (Exception e)
                  {
                        _logger.LogError(e.Message);
                        return Util.InternalServerErrorResponse("Internal server error");
                  }
            }

            // [DELETE] /user
            [HttpDelete]
            public async Task<ActionResult> DeleteUsers([FromBody] List<UserModel> users)
            {
                  if (users == null || users.Count == 0)
                  {
                        return BadRequest("No users provided for deletion.");
                  }

                  if (User.Identity is not ClaimsIdentity claimsIdentity)
                  {
                        return Unauthorized("User identity is null.");
                  }

                  var userIdClaim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
                  if (userIdClaim == null)
                  {
                        return Unauthorized("User ID claim is missing.");
                  }

                  int loggingInId;
                  try
                  {
                        loggingInId = int.Parse(userIdClaim.Value);
                  }
                  catch (Exception ex)
                  {
                        return BadRequest("Invalid User ID in the claim.");
                  }

                  var userRoleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);
                  if (userRoleClaim != null && userRoleClaim.Value == "Manager")
                  {
                        Console.WriteLine("User is a Manager, skipping deletion.");
                  }

                  // Filter out users who are managers or the currently logged-in user
                  foreach (var user in users)
                  {
                        // Fetch user details from the database
                        var userFromDb = await _context.User.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Id == user.Id);
                        if (userFromDb == null)
                        {
                              Console.WriteLine($"User with ID: {user.Id} not found in the database, skipping.");
                              continue;
                        }

                        // Skip deletion if the user is a manager or the logged-in user
                        if (userFromDb.Roles == null)
                        {
                              Console.WriteLine($"User with ID: {user.Id} has no roles assigned, skipping.");
                              continue;
                        }

                        if (userFromDb.Roles.Id == 1 || userFromDb.Id == loggingInId)
                        {
                              Console.WriteLine($"Skipping deletion for User ID: {user.Id} (Role: {userFromDb.Roles.Name}, Logged-in User ID: {loggingInId})");
                              continue;
                        }

                        userFromDb.DeletedAt = DateTime.UtcNow;
                  }

                  await _context.SaveChangesAsync();


                  var newUsers = await _context.User.Where(u => u.DeletedAt == null).Include(u => u.Roles).ToListAsync();

                  return Ok(new { message = "Users deleted successfully.", newUsers });
            }

            // [PUT] /user
            [HttpPut("{id}")]
            [Produces("application/json")]
            public async Task<ActionResult<ICollection<UserModel>>> EditUser([FromBody] UserModel payload, int id)
            {
                  Console.WriteLine("Email: " + payload.Email);
                  Console.WriteLine("Name: " + payload.Name);
                  Console.WriteLine("PhoneNumber: " + payload.PhoneNumber);
                  Console.WriteLine("User logged in Id: " + id);
                  try
                  {
                        if (!ModelState.IsValid)
                        {
                              return Util.BadRequestResponse("Missing data");
                        }

                        var currentUser = await _context.User.Include(u => u.Roles).FirstAsync(u => u.Id == id);
                        if (currentUser == null)
                        {
                              return Util.NotFoundResponse("User not found");
                        }

                        // Check if the email already exists
                        var emailExists = await _context.User.AnyAsync(user => (user.Email == payload.Email) && user.DeletedAt == null && user.Id != currentUser.Id);
                        if (emailExists)
                        {
                              return Util.ConflictResponse("Email already exists");
                        }

                        // Check if the role exists
                        var roleExists = await _context.Role.AnyAsync(role => role.Id == payload.RoleId);
                        if (!roleExists)
                        {
                              payload.RoleId = 4; // Default role ID, can be moved to a config setting
                        }

                        // Check if the phone number already exists
                        var phoneExists = await _context.User.AnyAsync(user => user.PhoneNumber == payload.PhoneNumber && user.DeletedAt == null && user.Id != currentUser.Id);
                        if (phoneExists)
                        {
                              return Util.ConflictResponse("Phone number already exists");
                        }

                        // Hash the password
                        if (payload.Password != null && payload.Password.Length != 0)
                        {
                              payload.Password = Crypto.HashPassword(payload.Password);
                              currentUser.Password = payload.Password;
                        }

                        // Set FirstBook flagservice
                        payload.FirstBook = true;
                        currentUser.Name = payload.Name;
                        currentUser.Email = payload.Email;
                        currentUser.PhoneNumber = payload.PhoneNumber;
                        currentUser.Gender = payload.Gender;
                        currentUser.Dob = payload.Dob;
                        currentUser.RoleId = payload.RoleId;
                        currentUser.FirstBook = payload.FirstBook;
                        currentUser.UpdatedAt = DateTime.UtcNow;

                        _context.User.Update(currentUser);
                        await _context.SaveChangesAsync();

                        return Util.OkResponse(new { message = "User updated successfully", currentUser });
                  }
                  catch (Exception e)
                  {
                        Console.WriteLine(e);
                        return Util.InternalServerErrorResponse("An unexpected error occured");
                  }
            }

            [HttpPost("avatar")]
            public async Task<ActionResult<ICollection<UserModel>>> AddAvatar([FromForm] int userId, [FromForm] IFormFile avatar)
            {
                  try
                  {
                        if (!ModelState.IsValid)
                        {
                              return Util.BadRequestResponse("Missing data");
                        }

                        Console.WriteLine("This line run");

                        var user = await _context.User.FindAsync(userId);
                        if (user == null)
                        {
                              return Util.NotFoundResponse("User not found");
                        }

                        if (avatar == null || avatar.Length > 0)
                        {
                              using var ms = new MemoryStream();
                              await avatar.CopyToAsync(ms);
                              var imageData = ms.ToArray();

                              user.Avatar = imageData;


                              _context.User.Update(user);
                              await _context.SaveChangesAsync();
                        }

                        return Util.CreatedResponse(new { message = "Avatar changed successfully" });
                  }
                  catch (Exception e)
                  {
                        _logger.LogError(e, "Error retrieving galleries");
                        return Util.InternalServerErrorResponse("Internal server error");
                  }
            }
      }
}
