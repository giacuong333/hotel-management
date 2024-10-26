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

        public RoleController(DatabaseContext context, ILogger<RoleController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // [GET] /role
        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<RoleModel>>> GetRoles()
        {
            try
            {
                var roles = await _context.Role.ToListAsync();

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
                var role = await _context.Role.FindAsync(id);
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


                await _context.Role.AddAsync(newRole);
                await _context.SaveChangesAsync();

                return StatusCode(201, new { message = "Role added successfully", newRole });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, new { message = "Internal server error" });
            }
        }


        // [PUT] /role
        // [HttpPut("{id}")]
        // [Produces("application/json")]
        // public async Task<ActionResult<ICollection<RoleModel>>> EditRole([FromBody] RoleModel payload, int id)
        // {
        //     try
        //     {
        //         if (!ModelState.IsValid)
        //         {
        //             return Util.BadRequestResponse("Missing data");
        //         }

        //         var currentRole = await _context.Role.FirstAsync(r => r.Id == id);
        //         if (currentRole == null)
        //         {
        //             return Util.NotFoundResponse("Role not found");
        //         }



        //         currentRole.Name = payload.Name;


        //         _context.Role.Update(currentRole);
        //         await _context.SaveChangesAsync();

        //         return Util.OkResponse(new { message = "Role updated successfully", currentRole });
        //     }
        //     catch (Exception e)
        //     {
        //         Console.WriteLine(e);
        //         return Util.InternalServerErrorResponse("An unexpected error occured");
        //     }
        // }

        // [DELETE] /role/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<RoleModel>>> DeleteRoleById(int id)
        {
            try
            {
                var role = await _context.Role.FindAsync(id);
                var users = await _context.User.Where(u => u.RoleId == id).ToListAsync();
                if (role == null)
                {
                    return NotFound(new { message = "Role not found." });
                }
                if (users.Count > 0)
                {
                    return BadRequest(new { message = "Role assigned to one or more users." });
                }

                _context.Role.Remove(role);


                await _context.SaveChangesAsync();

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

                var roleFromDb = await _context.Role.FirstOrDefaultAsync(r => r.Id == role.Id);

                if (roleFromDb == null)
                {

                    continue;
                }


                var users = await _context.User.Where(u => u.RoleId == role.Id).ToListAsync();

                if (users.Count > 0)
                {
                    return BadRequest(new { message = $"Role with ID: {role.Id} is assigned to one or more users and cannot be deleted." });
                }


                _context.Role.Remove(roleFromDb);
            }


            await _context.SaveChangesAsync();

            var newRoles = await _context.Role.ToListAsync();

            return Ok(new { message = "Roles deleted successfully.", newRoles });
        }

    }
}
