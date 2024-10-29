
using backend.Models;

public interface IRoleService
{
      Task<RoleModel> GetRoleByIdAsync(object id);

    Task<IEnumerable<RoleModel>> GetRolesAsync();
    Task CreateRoleAsync(RoleModel role);
    Task UpdateRoleAsync(RoleModel role);
    Task DeleteRoleAsync(object id);
    Task SaveAsync();
}