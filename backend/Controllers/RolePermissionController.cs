using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using backend.Models;
using backend.Database;
using Microsoft.Extensions.Logging;
using System.Web.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RolePermissionController : ControllerBase
    {
        private readonly IRolePermissionService _rolePermissionService;
        public RolePermissionController(IRolePermissionService rolePermissionService)
        {
            _rolePermissionService = rolePermissionService;
        }
        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult<RolepermissionModel>> GetRolePermisson()
        {
            try
            {
                var rolePermission = await _rolePermissionService.GetRolePermissionsAsync();

                if (rolePermission == null)
                {
                    return NotFound();
                }

                return Ok(rolePermission);
            }
            catch (Exception e)
            {
             
                return StatusCode(500, "Internal server error");
            }
        }





        // [GET] /review/{id}
        [HttpGet("{id}")]
        [Produces("application/json")]

        public async Task<ActionResult<RolepermissionModel>> GetRolePermissonById(int id)
        {
            try
            {
                var rolePermission = await _rolePermissionService.GetRolePermissionByIdAsync(id);

                if(rolePermission == null)
                {
                    return NotFound();
                }

                return Ok(rolePermission);
            }
            catch (Exception e)
            {
             
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<RolepermissionModel>>> SaveRolePermissions([FromBody] List<RolepermissionModel> models)
        {
            if (models == null || !models.Any())
            {
                return BadRequest("Invalid data.");
            }

            try
            {


                var permissionsToDelete = (await _rolePermissionService.GetRolePermissionByIdAsync(models.First().RoleId)).ToList();


                // Remove the permissions
                await _rolePermissionService.DeleteRolePermissionsAsync(permissionsToDelete);
       
                // Add new permissions
                await _rolePermissionService.AddRolePermissionsAsync(models);
           
                await _rolePermissionService.SaveAsync();

                return CreatedAtAction(null, new { roleId = models.First().RoleId }, models);
            }
            catch (Exception e)
            {
           
                return StatusCode(500, "Internal server error");
            }
        }





    }
}
