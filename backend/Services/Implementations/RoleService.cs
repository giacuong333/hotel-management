using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web.Helpers;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Repositories.Interfaces;
using Services.Interfaces;

public class RoleService : IRoleService
{
    private readonly IUnitOfWork _unitOfWork;


    public RoleService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;

    }

    public async Task<RoleModel> GetRoleByIdAsync(object id)
    {
        return await _unitOfWork.Roles.GetByIdAsync(id);
    }
    public async Task CreateRoleAsync(RoleModel role)
    {
        await _unitOfWork.Roles.CreateAsync(role);
        await _unitOfWork.CompleteAsync();

    }

    public async Task DeleteRoleAsync(object id)
    {
        await _unitOfWork.Roles.DeleteAsync(id);
        await _unitOfWork.CompleteAsync();
    }



    public async Task<IEnumerable<RoleModel>> GetRolesAsync()
    {
        return await _unitOfWork.Roles.GetAllAsync();
    }


    public async Task UpdateRoleAsync(RoleModel role)
    {
        await _unitOfWork.Roles.UpdateAsync(role);
        await _unitOfWork.CompleteAsync();
    }
}
