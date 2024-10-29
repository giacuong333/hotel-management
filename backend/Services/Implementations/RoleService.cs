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
      private readonly IRoleRepository _roleRepository;


      public RoleService(IRoleRepository roleRepository)
      {
            _roleRepository = roleRepository;
       
      }

      public async Task<RoleModel> GetRoleByIdAsync(object id)
      {
            return await _roleRepository.GetByIdAsync(id);
      }
    public async Task CreateRoleAsync(RoleModel role)
    {
        await _roleRepository.CreateAsync(role);

    }

    public async Task DeleteRoleAsync(object id)
    {
        await _roleRepository.DeleteAsync(id);
    }



    public async Task<IEnumerable<RoleModel>> GetRolesAsync()
    {
        return await _roleRepository.GetAllAsync();
    }

    public async Task SaveAsync()
    {
        await _roleRepository.SaveAsync();
    }

    public async Task UpdateRoleAsync(RoleModel role)
    {
        await _roleRepository.UpdateAsync(role);
    }
}
