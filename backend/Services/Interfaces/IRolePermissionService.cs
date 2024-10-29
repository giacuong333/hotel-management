
using backend.Models;

public interface IRolePermissionService
{
    Task<IEnumerable<RolepermissionModel>> GetRolePermissionsAsync();
    Task<IEnumerable<RolepermissionModel>> GetRolePermissionByIdAsync(Object id);
    Task DeleteRolePermissionsAsync(List<RolepermissionModel> models);
    Task AddRolePermissionsAsync(List<RolepermissionModel> models);

    Task SaveAsync();
}