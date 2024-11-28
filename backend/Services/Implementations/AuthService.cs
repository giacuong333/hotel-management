// AuthService.cs
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web.Helpers;
using backend.Models;
using Microsoft.IdentityModel.Tokens;
using Repositories.Interfaces;
using Services.Interfaces;

public class AuthService(IConfiguration configuration, IUnitOfWork unitOfWork) : IAuthService
{
      private readonly IUnitOfWork _unitOfWork = unitOfWork;
      private readonly IConfiguration _configuration = configuration;

      public async Task<(UserModel, string)> CreateUserByEmailAndNameAsync(string name, string email)
      {
            var user = await _unitOfWork.Users.GetUserByEmailAsync(email);

            if (user == null)
            {
                  user = new UserModel { Name = name, Email = email, RoleId = 4 };
                  await _unitOfWork.Users.CreateAsync(user);
                  await _unitOfWork.CompleteAsync();
                  user = await _unitOfWork.Users.GetUserByEmailAsync(email);
            }

            var token = GenerateJwtToken(user);
            return (user, token);
      }

      public async Task<UserModel> GetProfile(int id)
      {
            var user = await _unitOfWork.Users.GetUserByIdAsync(id) ?? throw new UnauthorizedAccessException("User not found");
            return user;
      }

      public async Task<AuthResponse> LoginAsync(LoginRequest request)
      {
            try
            {
                  var user = await _unitOfWork.Users.GetUserByEmailAsync(request.Email) ??
                        throw new NotFoundException("Email does not exist");
                  Console.WriteLine("User password: " + user.Password);
                  bool isPasswordValid = Crypto.VerifyHashedPassword(user.Password, request.Password);
                  if (!isPasswordValid)
                        throw new UnauthorizedException("Password is incorrect");

                  var token = GenerateJwtToken(user);

                  return new AuthResponse
                  {
                        Token = token,
                        RoleId = user.Roles!.Id
                  };
            }
            catch (Exception ex)
            {
                  Console.WriteLine("Error occurs while signing in" + ex.Message);
                  throw;
            }
      }

      private string GenerateJwtToken(UserModel user)
      {
            var jwtKey = _configuration["JwtKey:Key"];
            if (string.IsNullOrEmpty(jwtKey))
                  throw new ArgumentNullException("JWT signing key is not configured in appsettings.json.");

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var claims = new List<Claim>
            {
                  new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                  new Claim(ClaimTypes.Name, user.Name),
                  new Claim(ClaimTypes.Email, user.Email),
                  new Claim(ClaimTypes.Role, user.Roles.Name ?? "Customer")
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                  Subject = new ClaimsIdentity(claims),
                  Expires = DateTime.UtcNow.AddHours(1),
                  SigningCredentials = credentials,
                  Issuer = _configuration["Jwt:Issuer"],
                  Audience = _configuration["Jwt:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
      }
}

public class NotFoundException : Exception
{
      public NotFoundException(string message) : base(message) { }
}

public class UnauthorizedException : Exception
{
      public UnauthorizedException(string message) : base(message) { }
}