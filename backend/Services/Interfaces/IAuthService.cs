using backend.Models;

namespace Services.Interfaces
{
      public interface IAuthService
      {
            Task<AuthResponse> LoginAsync(LoginRequest request);
            Task<UserModel> GetProfile(int id);
      }

      public class LoginRequest
      {
            public string? Email { get; set; }
            public string? Password { get; set; }
      }

      public class AuthResponse
      {
            public string? Token { get; set; }
            public int? RoleId { get; set; }
      }
}