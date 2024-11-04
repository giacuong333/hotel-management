using backend.Models;
using backend.Repositories.Interfaces;
using Repositories.Interfaces;

public class RolePermissionService : IRolePermissionService
{
      private readonly IUnitOfWork _unitOfWork ;


      public RolePermissionService(IUnitOfWork unitOfWork)
      {
        _unitOfWork = unitOfWork;
      
    
      }

    public async Task AddRolePermissionsAsync(List<RolepermissionModel> models)
    {
        await _unitOfWork.RolePermissions.AddRolePermissionsAsync(models);
        await _unitOfWork.CompleteAsync();
    }

    public async Task DeleteRolePermissionsAsync(List<RolepermissionModel> models)
    {
        await _unitOfWork.RolePermissions.DeleteListAsync(models);
        await _unitOfWork.CompleteAsync();
    }



    public async Task<IEnumerable<RolepermissionModel>> GetRolePermissionsAsync()
    {
        return await _unitOfWork.RolePermissions.GetAllAsync();
    }

    public async Task<IEnumerable<RolepermissionModel>> GetRolePermissionByIdAsync(object id)
    {
       return await _unitOfWork.RolePermissions.GetByIdAsync(id);
    }

  




   


}
