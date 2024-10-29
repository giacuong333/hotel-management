using backend.Models;
using Interfaces;

namespace backend.Repositories.Interfaces
{
    public interface IRolePermissionRepository
    {
        Task<IEnumerable<RolepermissionModel>> GetAllAsync();
        Task<IEnumerable<RolepermissionModel>> GetByIdAsync(Object id);
        Task DeleteListAsync(List<RolepermissionModel> models);
        Task AddRolePermissionsAsync(List<RolepermissionModel> models);

        Task SaveAsync();

    }
}
