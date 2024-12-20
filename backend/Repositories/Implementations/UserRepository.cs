using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implementations
{
      public class UserRepository : GenericRepository<UserModel>, IUserRepository
      {
            public UserRepository(DatabaseContext context) : base(context) { }

            public async Task<UserModel?> GetUserByEmailAsync(string email)
            {
                  return await _context.User
                        .Where(u => u.Email == email && u.DeletedAt == null)
                        .Select(u => new UserModel
                        {
                              Id = u.Id,
                              Name = u.Name,
                              Email = u.Email,
                              PhoneNumber = u.PhoneNumber,
                              Avatar = u.Avatar,
                              Gender = u.Gender,
                              Password = u.Password,
                              RoleId = u.RoleId,
                              FirstBook = u.FirstBook,
                              Dob = u.Dob,
                              CreatedAt = u.CreatedAt,
                              UpdatedAt = u.UpdatedAt,
                              DeletedAt = u.DeletedAt,
                              Roles = new RoleModel
                              {
                                    Id = u.Roles!.Id,
                                    Name = u.Roles.Name,
                              }
                        })
                        .FirstOrDefaultAsync();
            }

            public async Task<UserModel?> GetUserByPhoneAsync(string phoneNumber)
            {
                  return await _context.User
                        .Where(u => u.PhoneNumber == phoneNumber && u.DeletedAt == null)
                        .Select(u => new UserModel
                        {
                              Id = u.Id,
                              Name = u.Name,
                              Email = u.Email,
                              PhoneNumber = u.PhoneNumber,
                              Avatar = u.Avatar,
                              Gender = u.Gender,
                              RoleId = u.RoleId,
                              Password = u.Password,
                              FirstBook = u.FirstBook,
                              Dob = u.Dob,
                              CreatedAt = u.CreatedAt,
                              UpdatedAt = u.UpdatedAt,
                              DeletedAt = u.DeletedAt,
                              Roles = new RoleModel
                              {
                                    Id = u.Roles!.Id,
                                    Name = u.Roles.Name,
                              }
                        })
                        .FirstOrDefaultAsync();
            }

            public async Task<UserModel?> GetUserByIdAsync(int id)
            {
                  return await _context.User
                        .Where(u => u.Id == id && u.DeletedAt == null)
                        .Select(u => new UserModel
                        {
                              Id = u.Id,
                              Name = u.Name,
                              Email = u.Email,
                              PhoneNumber = u.PhoneNumber,
                              Avatar = u.Avatar,
                              Password = u.Password,
                              Gender = u.Gender,
                              RoleId = u.RoleId,
                              FirstBook = u.FirstBook,
                              Dob = u.Dob,
                              CreatedAt = u.CreatedAt,
                              UpdatedAt = u.UpdatedAt,
                              DeletedAt = u.DeletedAt,
                              Roles = new RoleModel
                              {
                                    Id = u.Roles!.Id,
                                    Name = u.Roles.Name,
                              }
                        })
                        .FirstOrDefaultAsync();
            }

            public async Task<IEnumerable<UserModel>> GetUsersAsync()
            {
                  return await _context.User
                        .Where(u => u.DeletedAt == null)
                        .Select(u => new UserModel
                        {
                              Id = u.Id,
                              Name = u.Name,
                              Email = u.Email,
                              PhoneNumber = u.PhoneNumber,
                              Avatar = u.Avatar,
                              Gender = u.Gender,
                              Password = u.Password,
                              RoleId = u.RoleId,
                              FirstBook = u.FirstBook,
                              Dob = u.Dob,
                              CreatedAt = u.CreatedAt,
                              UpdatedAt = u.UpdatedAt,
                              DeletedAt = u.DeletedAt,
                              Roles = new RoleModel
                              {
                                    Id = u.Roles!.Id,
                                    Name = u.Roles.Name,
                              }
                        })
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