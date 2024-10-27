// AuthService.cs
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web.Helpers;
using backend.Models;
using Microsoft.IdentityModel.Tokens;
using Repositories.Interfaces;
using Services.Interfaces;

public class AuthService : IAuthService
{
      private readonly IUserRepository _userRepository;
      private readonly IConfiguration _configuration;
      private readonly ILogger<AuthService> _logger;

      public AuthService(IUserRepository userRepository, IConfiguration configuration, ILogger<AuthService> logger)
      {
            _userRepository = userRepository;
            _configuration = configuration;
            _logger = logger;
      }

      public async Task<UserModel> GetProfile(int id)
      {
            var user = await _userRepository.GetByIdAsync(id) ?? throw new UnauthorizedAccessException("User not found");
            return user;
      }


      public async Task<AuthResponse> LoginAsync(LoginRequest request)
      {
            try
            {
                  var user = await _userRepository.GetUserByEmailAsync(request.Email) ??
                        throw new NotFoundException("Email does not exist");
                  bool isPasswordValid = Crypto.VerifyHashedPassword(user.Password, request.Password);
                  if (!isPasswordValid)
                  {
                        throw new UnauthorizedException("Password is incorrect");
                  }

                  var token = GenerateJwtToken(user);

                  return new AuthResponse
                  {
                        Token = token,
                        RoleId = (int)user.Roles.Id
                  };
            }
            catch (Exception ex)
            {
                  _logger.LogError(ex, "Error during login process");
                  throw;
            }
      }

      private string GenerateJwtToken(UserModel user)
      {
            var jwtKey = _configuration["JwtKey:Key"]; // Get the key in the settings file
            if (string.IsNullOrEmpty(jwtKey))
            {
                  throw new ArgumentNullException("JWT signing key is not configured in appsettings.json.");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtKey);
            if (key.Length < 32)
            {
                  throw new ArgumentOutOfRangeException(nameof(key), "JWT signing key must be at least 256 bits (32 bytes) long.");
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                  Subject = new ClaimsIdentity(new[]
                  {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.Name, user.Name),
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(ClaimTypes.Role, user.Roles.Name),
            }),
                  Expires = DateTime.UtcNow.AddHours(1),
                  SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
      }
}

// Custom Exceptions
public class NotFoundException : Exception
{
      public NotFoundException(string message) : base(message) { }
}

public class UnauthorizedException : Exception
{
      public UnauthorizedException(string message) : base(message) { }
}