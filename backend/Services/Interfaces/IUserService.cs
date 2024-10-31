
using backend.Models;

public interface IUserService
{
      Task<IEnumerable<UserModel>> GetUsersAsync();
      Task<UserModel> GetUserByIdAsync(int id);
      Task<UserModel> GetUserByEmailAsync(string email);
      Task<UserModel> GetUserByPhoneAsync(string phoneNumber);
      Task<IEnumerable<UserModel>> GetUsesByRoleIdAsync(int id);
      Task CreateUserAsync(UserModel user);
      Task UpdateUserAsync(UserModel user);
      Task DeleteUserAsync(object id);
      Task<int> SaveAsync();
}