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
      private readonly IConfiguration _configuration;
      private readonly ILogger<RoleService> _logger;

      public RoleService(IRoleRepository roleRepository, IConfiguration configuration, ILogger<RoleService> logger)
      {
            _roleRepository = roleRepository;
            _configuration = configuration;
            _logger = logger;
      }

      public async Task<RoleModel> GetRoleByIdAsync(object id)
      {
            return await _roleRepository.GetByIdAsync(id);
      }
}
