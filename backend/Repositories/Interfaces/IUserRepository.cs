using backend.Models;
using Interfaces;

namespace Repositories.Interfaces
{
      public interface IUserRepository : IGenericRepository<UserModel>
      {
            Task<UserModel?> GetUserByEmailAsync(string email);
            Task<UserModel?> GetUserByPhoneAsync(string phoneNumber);
            Task<UserModel?> GetUserByIdAsync(int id);
            Task<IEnumerable<UserModel>> GetUsersAsync();
            Task<IEnumerable<UserModel>> GetUsesByRoleIdAsync(int Roleid);
      }
}