using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using backend.Models;
using backend.Database;
using Microsoft.Extensions.Logging;
using System.Web.Helpers;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly ILogger<RoleController> _logger;
        private readonly IRoleService _roleService;
        private readonly IUserService _userService;
        private readonly IRolePermissionService _rolePermissionService;



        public RoleController(DatabaseContext context, ILogger<RoleController> logger,IRoleService roleService, IUserService userService, IRolePermissionService rolePermissionService)
        {
            _context = context;
            _logger = logger;
            _roleService = roleService;
            _userService = userService;
            _rolePermissionService = rolePermissionService;
        }

        // [GET] /role
        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<RoleModel>>> GetRoles()
        {
            try
            {
                var roles = await _roleService.GetRolesAsync();

                if (roles == null)
                {
                    return NotFound(new { message = "Roles not found" });
                }

                return Ok(roles);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving roles");
                return StatusCode(500, "Internal server error");
            }
        }

        // [GET] /role/{id}
        [HttpGet("{id}")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<RoleModel>>> GetRole(int id)
        {
            try
            {
                var role = await _roleService.GetRoleByIdAsync(id);
                return Ok(role);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving roles");
                return StatusCode(500, "Internal server error");
            }
        }

        // [POST] /role
        [HttpPost]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<RoleModel>>> CreateRole([FromBody] RoleModel role)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var newRole = new RoleModel
                {
                    Name = role.Name,
                };


                await _roleService.CreateRoleAsync(newRole);
                await _roleService.SaveAsync();

                return StatusCode(201, new { message = "Role added successfully", newRole });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, new { message = "Internal server error" });
            }
        }


        // [PUT] /role
         [HttpPut("{id}")]
         [Produces("application/json")]
        public async Task<ActionResult<ICollection<RoleModel>>> EditRole([FromBody] RoleModel payload, int id)
         {
            try
             {
                 if (!ModelState.IsValid)
                 {
                    return BadRequest(ModelState);
                }

                 var currentRole = await _roleService.GetRoleByIdAsync(id);
                 if (currentRole == null)
                 {
                     return NotFound("Role not found");
                 }



                 currentRole.Name = payload.Name;


                 await _roleService.UpdateRoleAsync(currentRole);
                await _roleService.SaveAsync();

                 return Ok(new { message = "Role updated successfully", currentRole });
             }
             catch (Exception e)
             {
             
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        // [DELETE] /role/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<RoleModel>>> DeleteRoleById(int id)
        {
            try
            {
                var role = await _roleService.GetRoleByIdAsync(id);
                var users = await _userService.GetUsesByRoleIdAsync(id);
                if (role == null)
                {
                    return NotFound(new { message = "Role not found." });
                }
                if (users.Any())
                {
                    return BadRequest(new { message = "Role assigned to one or more users." });

                }
                var permissionsToDelete = (await _rolePermissionService.GetRolePermissionByIdAsync(id)).ToList();

                if (permissionsToDelete.Any())
                {
                    await _rolePermissionService.DeleteRolePermissionsAsync(permissionsToDelete);
                    await _rolePermissionService.SaveAsync();
                }



             
           


                await   _roleService.DeleteRoleAsync(role.Id);


                await _roleService.SaveAsync();

                return Ok(new { message = "Role deleted successfully" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, "Internal server error");
            }
        }


        // [GET] /review
        [HttpDelete]
        public async Task<ActionResult> DeleteRoles([FromBody] List<RoleModel> roles)
        {
            if (roles == null || roles.Count == 0)
            {
                return BadRequest("No roles provided for deletion.");
            }

            foreach (var role in roles)
            {

                var roleFromDb = await _roleService.GetRoleByIdAsync(role.Id);

                if (roleFromDb == null)
                {

                    continue;
                }


                var users = await _userService.GetUsesByRoleIdAsync((int)role.Id);

                if (users.Any())
                {
                    return BadRequest(new { message = $"Role with ID: {role.Id} is assigned to one or more users and cannot be deleted." });
                }
                var permissionsToDelete = (await _rolePermissionService.GetRolePermissionByIdAsync(role.Id)).ToList();

                if (permissionsToDelete.Any())
                {
                    await _rolePermissionService.DeleteRolePermissionsAsync(permissionsToDelete);
                    await _rolePermissionService.SaveAsync();
                }





                await _roleService.DeleteRoleAsync(roleFromDb.Id);
            }


            await _roleService.SaveAsync();

            var newRoles = await _roleService.GetRolesAsync();

            return Ok(new { message = "Roles deleted successfully.", newRoles });
        }

    }
}
