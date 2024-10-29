using backend.Models;
using backend.Repositories.Interfaces;
using Repositories.Interfaces;

public class RolePermissionService : IRolePermissionService
{
      private readonly IRolePermissionRepository _rolePermissionRepository;


      public RolePermissionService(IRolePermissionRepository rolePermissionRepository, IConfiguration configuration, ILogger<RoomService> logger)
      {
        _rolePermissionRepository = rolePermissionRepository;
    
      }

    public async Task AddRolePermissionsAsync(List<RolepermissionModel> models)
    {
        await _rolePermissionRepository.AddRolePermissionsAsync(models);
    }

    public async Task DeleteRolePermissionsAsync(List<RolepermissionModel> models)
    {
        await _rolePermissionRepository.DeleteListAsync(models);
    }



    public async Task<IEnumerable<RolepermissionModel>> GetRolePermissionsAsync()
    {
        return await _rolePermissionRepository.GetAllAsync();
    }

    public async Task<IEnumerable<RolepermissionModel>> GetRolePermissionByIdAsync(object id)
    {
       return await _rolePermissionRepository.GetByIdAsync(id);
    }

  


    public async Task SaveAsync()
      {
            await _rolePermissionRepository.SaveAsync();
      }

   


}
