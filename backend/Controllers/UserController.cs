using System.Security.Claims;
using System.Web.Helpers;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Services.Interfaces;

namespace backend.Controllers
{
      [Route("[controller]")]
      [ApiController]
      public class UserController(IAuthService authService, IUserService userService, IRoleService roleService) : ControllerBase
      {
            private readonly IAuthService _authService = authService;
            private readonly IUserService _userService = userService;
            private readonly IRoleService _roleService = roleService;

            // [POST] user/login
            [HttpPost("login")]
            [Produces("application/json")]
            public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
            {
                  try
                  {
                        if (!ModelState.IsValid)
                        {
                              return BadRequest(ModelState);
                        }

                        var response = await _authService.LoginAsync(request);
                        return Ok(response);
                  }
                  catch (NotFoundException ex)
                  {
                        return NotFound(new { message = ex.Message });
                  }
                  catch (UnauthorizedException ex)
                  {
                        return Unauthorized(new { message = ex.Message });
                  }
                  catch (Exception ex)
                  {
                        return StatusCode(500, "Internal server error");
                  }
            }

            private static int GetUserIdFromClaims(HttpContext httpContext)
            {
                  var userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier);
                  if (userIdClaim != null)
                        return int.Parse(userIdClaim!.Value);

                  throw new UnauthorizedAccessException("User ID not found in claims.");
            }

            // [GET] /user/profile
            [Authorize]
            [HttpGet("profile")]
            [Produces("application/json")]
            public async Task<ActionResult<UserModel>> GetProfile()
            {
                  try
                  {
                        int userId = GetUserIdFromClaims(HttpContext);
                        var user = await _authService.GetProfile(userId);

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
                        return Unauthorized(new { message = ex.Message });
                  }
            }

            // [GET] /user
            [HttpGet]
            [Produces("application/json")]
            public async Task<ActionResult<IEnumerable<UserModel>>> GetUsers()
            {
                  try
                  {
                        var users = await _userService.GetUsersAsync();
                        return Ok(users);
                  }
                  catch (NotFoundException ex)
                  {
                        return NotFound(new { message = ex.Message });
                  }
                  catch (UnauthorizedException ex)
                  {
                        return Unauthorized(new { message = ex.Message });
                  }
                  catch (Exception ex)
                  {
                        return StatusCode(500, "Internal server error");
                  }
            }

            // [GET] /user/{id}
            [HttpGet("{id}")]
            [Produces("application/json")]
            public async Task<ActionResult<UserModel>> GetUserById(int id)
            {
                  try
                  {
                        var user = await _userService.GetUserByIdAsync(id);
                        return Ok(user);
                  }
                  catch (NotFoundException ex)
                  {
                        return NotFound(new { message = ex.Message });
                  }
                  catch (UnauthorizedException ex)
                  {
                        return Unauthorized(new { message = ex.Message });
                  }
                  catch (Exception ex)
                  {
                        return StatusCode(500, "Internal server error");
                  }
            }

            private bool IsLoggedIn(HttpContext httpContext)
            {
                  return httpContext.User.Identity != null && httpContext.User.Identity.IsAuthenticated;
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
                              var user = await _userService.GetUserByIdAsync(id);
                              if (user == null)
                                    return NotFound("User not found");

                              var passwordMatches = Crypto.VerifyHashedPassword(user.Password, currentPassword);
                              if (!passwordMatches)
                              {
                                    return BadRequest("Current password is incorrect");
                              }

                              var passwordHashed = Crypto.HashPassword(newPassword);
                              user.Password = passwordHashed;

                              await _userService.UpdateUserAsync(user);
                              await _userService.SaveAsync();

                              return Ok("Password changed successfully");
                        }
                        catch (NotFoundException ex)
                        {
                              return NotFound(new { message = ex.Message });
                        }
                        catch (UnauthorizedException ex)
                        {
                              return Unauthorized(new { message = ex.Message });
                        }
                        catch (Exception ex)
                        {
                              return StatusCode(500, "Internal server error");
                        }
                  }
                  else
                  {
                        return Unauthorized("You are unauthorized");
                  }
            }

            // [POST] /user/register
            [HttpPost("register")]
            [Produces("application/json")]
            public async Task<ActionResult> Register([FromBody] UserModel request)
            {
                  try
                  {
                        if (!ModelState.IsValid)
                        {
                              return BadRequest(ModelState);
                        }

                        // Check if the email already exists
                        var emailExists = await _userService.GetUserByEmailAsync(request.Email);
                        if (emailExists != null)
                        {
                              return Conflict(new { message = "Email already exists" });
                        }

                        // Check if the phone number already exists
                        var phoneExists = await _userService.GetUserByPhoneAsync(request.PhoneNumber);
                        if (phoneExists != null)
                        {
                              return Conflict(new { message = "Phone number already exists" }); // 409 Conflict
                        }

                        // Check if the role exists
                        int defaultRoleId = 4;
                        if (request.RoleId != null)
                        {
                              var roleExists = await _roleService.GetRoleByIdAsync((int)request.RoleId);
                              if (roleExists != null)
                                    defaultRoleId = (int)roleExists.Id; // Default role ID, can be moved to a config setting
                        }

                        // Hash the password
                        request.Password = Crypto.HashPassword(request.Password);

                        // Set FirstBook flag
                        request.FirstBook = true;

                        var newUser = new UserModel
                        {
                              Name = request.Name,
                              Email = request.Email,
                              PhoneNumber = request.PhoneNumber,
                              Password = request.Password,
                              Gender = request.Gender,
                              Dob = request.Dob,
                              RoleId = defaultRoleId,
                              FirstBook = request.FirstBook,
                              CreatedAt = DateTime.UtcNow
                        };

                        await _userService.CreateUserAsync(newUser);

                        return StatusCode(201, new { message = "Sign up successfully", newUser });
                  }
                  catch (NotFoundException ex)
                  {
                        return NotFound(new { message = ex.Message });
                  }
                  catch (Exception ex)
                  {
                        // Log the exception details
                        Console.WriteLine($"An error occurred: {ex.Message}");
                        Console.WriteLine($"Stack Trace: {ex.StackTrace}");

                        return StatusCode(500, new { message = "Internal server error", error = ex.Message });
                  }
            }

            // [POST] /user/logout
            [HttpPost("logout")]
            [Produces("application/json")]
            public ActionResult Logout()
            {
                  try
                  {
                        var token = Request.Headers.Authorization.ToString().Replace("Bearer ", "");
                        if (string.IsNullOrEmpty(token))
                              return BadRequest(new { message = "Token is required" });
                        return Ok("Logout successfully");
                  }
                  catch (NotFoundException ex)
                  {
                        return NotFound(new { message = ex.Message });
                  }
                  catch (UnauthorizedException ex)
                  {
                        return Unauthorized(new { message = ex.Message });
                  }
                  catch (Exception ex)
                  {
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
                              return Unauthorized("User identity is null.");

                        var userIdClaim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
                        if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int loggingInId))
                              return Unauthorized("User ID claim is missing.");

                        // Check manager role
                        var userRoleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);
                        if (userRoleClaim?.Value == "Manager")
                              return StatusCode(403, new { message = "Managers cannot be deleted." });

                        var user = await _userService.GetUserByIdAsync(id);
                        if (user == null)
                              return NotFound(new { message = "User not found." });

                        if (user.RoleId == 1)
                              return StatusCode(403, new { message = "This user can not be deleted." });

                        if (user.Id == loggingInId)
                              return StatusCode(403, new { message = "You can not delete your own account." });

                        await _userService.DeleteUserAsync(id);
                        await _userService.SaveAsync();

                        return Ok("User deleted successfully");
                  }
                  catch (UnauthorizedException ex)
                  {
                        return Unauthorized(new { message = ex.Message });
                  }
                  catch (NotFoundException ex)
                  {
                        return NotFound(new { message = ex.Message });
                  }
                  catch (Exception ex)
                  {
                        // Log the exception
                        Console.WriteLine($"An error occurred: {ex.Message}");
                        Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                        return StatusCode(500, new { message = "Internal server error", error = ex.Message });
                  }
            }

            // [DELETE] /user/customer/{id}
            [HttpDelete("customer/{id}")]
            public async Task<ActionResult> SoftDeleteCustomerById(int id)
            {
                  try
                  {
                        var user = await _userService.GetUserByIdAsync(id);
                        if (user == null)
                              return NotFound("User not found");

                        await _userService.DeleteUserAsync(id);
                        await _userService.SaveAsync();

                        return Ok("Your account is deleted successfully");
                  }
                  catch (UnauthorizedException ex)
                  {
                        return Unauthorized(new { message = ex.Message });
                  }
                  catch (NotFoundException ex)
                  {
                        return NotFound(new { message = ex.Message });
                  }
                  catch (Exception ex)
                  {
                        // Log the exception
                        Console.WriteLine($"An error occurred: {ex.Message}");
                        Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                        return StatusCode(500, new { message = "Internal server error", error = ex.Message });
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

                  var claimsIdentity = User.Identity as ClaimsIdentity;
                  if (claimsIdentity == null)
                        return Unauthorized("User identity is null.");

                  var userIdClaim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
                  if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int loggingInId))
                        return Unauthorized("User ID claim is missing.");

                  // Check manager role
                  var userRoleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);
                  if (userRoleClaim?.Value == "Manager")
                        return StatusCode(403, new { message = "Managers cannot be deleted." });

                  // Filter out users who are managers or the currently logged-in user
                  foreach (var user in users)
                  {
                        // Fetch user details from the database
                        var userFromDb = await _userService.GetUserByIdAsync((int)user.Id);
                        if (userFromDb == null)
                        {
                              Console.WriteLine($"User with email: {user.Email} not found in the database, skipping.");
                              return NotFound($"User with email: {user.Email} not found in the database.");
                        }

                        // Skip deletion if the user is a manager or the logged-in user
                        if (userFromDb.RoleId == null)
                        {
                              Console.WriteLine($"User with email: {user.Email} has no roles assigned, skipping.");
                              return StatusCode(403, new { message = $"User with email: {user.Email} has no roles assigned" });
                        }

                        if (userFromDb.RoleId == 1)
                        {
                              Console.WriteLine($"Skipping deletion for User ID: {user.Id}, Logged-in User ID: {loggingInId})");
                              return StatusCode(403, new { message = "Can not delete the manager" });
                        }

                        if (userFromDb.Id == loggingInId)
                        {
                              Console.WriteLine($"Skipping deletion for User ID: {user.Id}, Logged-in User ID: {loggingInId})");
                              return StatusCode(403, new { message = "You can not delete yourself" });
                        }

                        await _userService.DeleteUserAsync(user.Id);
                  }

                  await _userService.SaveAsync();

                  var newUsers = await _userService.GetUsersAsync();

                  return Ok(new { message = "Users deleted successfully.", newUsers });
            }

            // [PUT] /user
            [HttpPut("{id}")]
            [Produces("application/json")]
            public async Task<ActionResult<ICollection<UserModel>>> EditUser([FromBody] UserModel request, int id)
            {
                  try
                  {
                        if (!ModelState.IsValid)
                        {
                              var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                              return BadRequest("Missing data");
                        }

                        var currentUser = await _userService.GetUserByIdAsync(id);
                        if (currentUser == null)
                        {
                              return NotFound("User not found");
                        }

                        // Check if the email already exists
                        if (currentUser.Email != request.Email)
                        {
                              var emailExists = await _userService.GetUserByEmailAsync(currentUser.Email);
                              if (emailExists != null)
                                    return Conflict("Email already exists");
                        }

                        // Check if the phone number already exists
                        if (currentUser.PhoneNumber != request.PhoneNumber)
                        {
                              var phoneExists = await _userService.GetUserByPhoneAsync(currentUser.PhoneNumber);
                              if (phoneExists != null)
                                    return Conflict("Phone number already exists");
                        }

                        // Check if the role exists
                        int defaultRoleId = 4;
                        if (request.RoleId != null)
                        {
                              var roleExists = await _roleService.GetRoleByIdAsync((int)currentUser.RoleId);
                              if (roleExists != null)
                                    defaultRoleId = (int)roleExists.Id; // Default role ID, can be moved to a config setting
                        }

                        // Hash the password
                        if (request.Password != null && request.Password.Length != 0)
                        {
                              request.Password = Crypto.HashPassword(request.Password);
                              currentUser.Password = request.Password;
                        }

                        // Set FirstBook flagservice
                        request.FirstBook = true;
                        currentUser.Id = id;
                        currentUser.Name = request.Name;
                        currentUser.Email = request.Email;
                        currentUser.PhoneNumber = request.PhoneNumber;
                        currentUser.Gender = request.Gender;
                        currentUser.Dob = request.Dob;
                        currentUser.RoleId = defaultRoleId;
                        currentUser.FirstBook = request.FirstBook;
                        currentUser.UpdatedAt = DateTime.UtcNow;

                        await _userService.UpdateUserAsync(currentUser);
                        await _userService.SaveAsync();

                        return Ok(new { message = "User updated successfully", currentUser });
                  }
                  catch (UnauthorizedException ex)
                  {
                        return Unauthorized(new { message = ex.Message });
                  }
                  catch (NotFoundException ex)
                  {
                        return NotFound(new { message = ex.Message });
                  }
                  catch (Exception ex)
                  {
                        // Log the exception
                        Console.WriteLine($"An error occurred: {ex.Message}");
                        Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                        return StatusCode(500, new { message = "Internal server error", error = ex.Message });
                  }
            }

            // [POST] user/avatar
            [HttpPost("avatar")]
            public async Task<ActionResult<ICollection<UserModel>>> AddAvatar([FromForm] int userId, [FromForm] IFormFile avatar)
            {
                  try
                  {
                        if (!ModelState.IsValid)
                        {
                              return BadRequest("Missing data");
                        }

                        var user = await _userService.GetUserByIdAsync(userId);
                        if (user == null)
                              return NotFound("User not found");

                        if (avatar == null || avatar.Length > 0)
                        {
                              using var ms = new MemoryStream();
                              await avatar.CopyToAsync(ms);
                              var imageData = ms.ToArray();

                              user.Avatar = imageData;

                              await _userService.UpdateUserAsync(user);
                              await _userService.SaveAsync();
                        }

                        return StatusCode(201, new { message = "Avatar changed successfully" });
                  }
                  catch (UnauthorizedException ex)
                  {
                        return Unauthorized(new { message = ex.Message });
                  }
                  catch (NotFoundException ex)
                  {
                        return NotFound(new { message = ex.Message });
                  }
                  catch (Exception ex)
                  {
                        // Log the exception
                        Console.WriteLine($"An error occurred: {ex.Message}");
                        Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                        return StatusCode(500, new { message = "Internal server error", error = ex.Message });
                  }
            }
      }
}