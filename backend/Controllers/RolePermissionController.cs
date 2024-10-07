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
        private readonly DatabaseContext _context;
        private readonly ILogger<ReviewController> _logger;
        private readonly IConfiguration _configuration;

        public RolePermissionController(DatabaseContext context, ILogger<ReviewController> logger, IConfiguration configuration)
        {
            _context = context;
            _logger = logger;
            _configuration = configuration;
        }
        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult<RolepermissionModel>> GetRolePermisson()
        {
            try
            {
                var rolePermission = await _context.Rolepermission.ToListAsync();

                if (rolePermission == null)
                {
                    return NotFound();
                }

                return Ok(rolePermission);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving rolePermission");
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
                var rolePermission = await _context.Rolepermission.Where(rp => rp.RoleId == id).ToListAsync();

                if(rolePermission == null)
                {
                    return NotFound();
                }

                return Ok(rolePermission);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving rolePermission");
                return StatusCode(500, "Internal server error");
            }
        }





    }
}
