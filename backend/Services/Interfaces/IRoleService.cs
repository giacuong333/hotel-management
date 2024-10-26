
using backend.Models;

public interface IRoleService
{
      Task<RoleModel> GetRoleByIdAsync(object id);
}