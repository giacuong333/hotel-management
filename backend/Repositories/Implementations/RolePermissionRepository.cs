using backend.Database;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implementations
{
      public class RolePermissionRepository : IRolePermissionRepository
    {
        protected readonly DatabaseContext _context;
        private readonly DbSet<RolepermissionModel> _dbSet;

        public RolePermissionRepository(DatabaseContext context)
        {
            _context = context;
            _dbSet = context.Set<RolepermissionModel>();
        }

    

        public async Task AddRolePermissionsAsync(List<RolepermissionModel> models)
        {
            await _dbSet.AddRangeAsync(models);
        }

        public async Task DeleteListAsync(List<RolepermissionModel> models)
        {
                _dbSet.RemoveRange(models);
        }

        public async Task<IEnumerable<RolepermissionModel>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<IEnumerable<RolepermissionModel>> GetByIdAsync(object id)
        {
            return await _dbSet.Where(rp => rp.RoleId == (int)id).ToListAsync();
        }

      

    }
}