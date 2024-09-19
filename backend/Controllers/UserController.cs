using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using backend.Models;
using backend.Database;
using Microsoft.Extensions.Logging;
using System.Web.Helpers;

namespace backend.Controllers
{
      [Route("[controller]")]
      [ApiController]
      public class UserController : ControllerBase
      {
            private readonly DatabaseContext _context;
            private readonly ILogger<UserController> _logger;

            public UserController(DatabaseContext context, ILogger<UserController> logger)
            {
                  _context = context;
                  _logger = logger;
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
            public async Task<ActionResult<UserModel>> Login([FromBody] UserModel value)
            {
                  try
                  {
                        var user = await _context.User.SingleOrDefaultAsync(u => u.Email == value.Email);

                        if (user == null)
                        {
                              return NotFound("Email does not exist");
                        }

                        bool isPasswordValid = Crypto.VerifyHashedPassword(value.Password, user.Password);

                        if (!isPasswordValid)
                        {
                              return Unauthorized("Password is incorrect");
                        }

                        return Ok(user);
                  }
                  catch (Exception e)
                  {
                        _logger.LogError(e, "Error logging in user");
                        return StatusCode(500, "Internal server error");
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
      }
}
