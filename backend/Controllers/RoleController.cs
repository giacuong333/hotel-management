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
      }
}
