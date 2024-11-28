using System.ComponentModel.DataAnnotations;
using backend.Models;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

namespace Services.Interfaces
{
      public interface IAuthService
      {
            Task<AuthResponse> LoginAsync(LoginRequest request);
            Task<(UserModel, string)> CreateUserByEmailAndNameAsync(string name, string email);
            Task<UserModel> GetProfile(int id);
      }

      public class LoginRequest
      {
            public string? Email { get; set; }
            public string? Password { get; set; }
      }

      public class GoogleLoginRequest
      {
            [Required]
            public string IdToken { get; set; }
      }

      public class AuthResponse
      {
            public string? Token { get; set; }
            public int? RoleId { get; set; }
      }
}