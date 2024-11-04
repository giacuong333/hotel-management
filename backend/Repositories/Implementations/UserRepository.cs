using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implementations
{
      public class UserRepository : GenericRepository<UserModel>, IUserRepository
      {
            public UserRepository(DatabaseContext context) : base(context) { }

            public async Task<UserModel> GetUserByEmailAsync(string email)
            {
                  return await _context.User
                        .Include(u => u.Roles)
                        .FirstOrDefaultAsync(u => u.Email == email && u.DeletedAt == null);
            }

        public async Task<UserModel> GetUserByIdAsync(int id)
        {
            return await _context.User
                        .Include(u => u.Roles)
                        .FirstOrDefaultAsync(u => u.Id == id && u.DeletedAt == null);
        }

        public async Task<UserModel> GetUserByPhoneAsync(string phoneNumber)
            {
                  return await _context.User
                        .Include(u => u.Roles)
                        .FirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber && u.DeletedAt == null);
            }

            public async Task<IEnumerable<UserModel>> GetUsersAsync()
            {
                  return await _context.User
                        .Where(u => u.DeletedAt == null)
                        .Include(u => u.Roles)
                        .ToListAsync();
            }
        public async Task<IEnumerable<UserModel>> GetUsesByRoleIdAsync(int id)
        {
            return await _context.User
                 .Where(u => u.DeletedAt == null && u.RoleId == id)
                  .ToListAsync();
        }
    }
}