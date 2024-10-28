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
    public class ServiceController1 : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly ILogger<ServiceController> _logger;
        private readonly IConfiguration _configuration;

        public ServiceController1(DatabaseContext context, ILogger<ServiceController> logger, IConfiguration configuration)
        {
            _context = context;
            _logger = logger;
            _configuration = configuration;
        }

        // [GET] /Service
        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<ServiceModel>>> GetServices()
        {
            try
            {
                var services = await _context.Service.Where(sv => sv.DeletedAt == null)
                      .ToListAsync();

                if (services == null)
                {
                    return NotFound(new { message = "Services not found." });
                }

                return Ok(services);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving Services");
                return StatusCode(500, "Internal server error");
            }
        }


        // [GET] /Service/active
        [HttpGet("active")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<ServiceModel>>> GetServicesActive()
        {
            try
            {
                var services = await _context.Service.Where(sv => sv.DeletedAt == null && sv.Status != 0)
                      .ToListAsync();

                if (services == null)
                {
                    return NotFound(new { message = "Services not found." });
                }

                return Ok(services);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving Services");
                return StatusCode(500, "Internal server error");
            }
        }

        // [GET] /Service/{id}
        [HttpGet("{id}")]
        [Produces("application/json")]
        public async Task<ActionResult<ServiceModel>> GetServiceById(int id)
        {
            try
            {
                var service = await _context.Service.FirstOrDefaultAsync(sv => sv.Id == id);

                if (service == null)
                {
                    return NotFound();
                }

                return Ok(service);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving Service");
                return StatusCode(500, "Internal server error");
            }
        }

        // [POST] /Service
        [HttpPost]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<ServiceModel>>> CreateService([FromBody] ServiceModel service)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var newService = new ServiceModel
                {
                    Name = service.Name,
                    Price = service.Price,
                    Status = service.Status,


                    CreatedAt = DateTime.UtcNow
                };



                await _context.Service.AddAsync(newService);
                await _context.SaveChangesAsync();

                return StatusCode(201, new { message = "Service added successfully", newService });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, new { message = "Internal server error" });
            }
        }



        // [PUT] /service
        // [HttpPut("{id}")]
        // [Produces("application/json")]
        // public async Task<ActionResult<ICollection<ServiceModel>>> EditService([FromBody] ServiceModel payload, int id)
        // {
        //     try
        //     {
        //         if (!ModelState.IsValid)
        //         {
        //             return Util.BadRequestResponse("Missing data");
        //         }

        //         var currentService = await _context.Service.FirstAsync(sv => sv.Id == id);
        //         if (currentService == null)
        //         {
        //             return Util.NotFoundResponse("Service not found");
        //         }
        //         currentService.Name = payload.Name;
        //         currentService.Price = payload.Price;
        //         currentService.Status = payload.Status;

        //         currentService.UpdatedAt = DateTime.UtcNow;

        //         _context.Service.Update(currentService);
        //         await _context.SaveChangesAsync();

        //         return Util.OkResponse(new { message = "Servuce updated successfully", currentService });
        //     }
        //     catch (Exception e)
        //     {
        //         Console.WriteLine(e);
        //         return Util.InternalServerErrorResponse("An unexpected error occured");
        //     }
        // }


        // [DELETE] /Service/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<ServiceModel>>> DeleteServiceById(int id)
        {
            try
            {
                var service = await _context.Service.FindAsync(id);

                if (service == null)
                {
                    return NotFound(new { message = "Service not found." });
                }
                service.DeletedAt = DateTime.UtcNow;


                await _context.SaveChangesAsync();

                return Ok(new { message = "Service deleted successfully" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, "Internal server error");
            }
        }


        // [GET] /Service
        [HttpDelete]
        public async Task<ActionResult> DeleteUsers([FromBody] List<ServiceModel> services)
        {
            if (services == null || services.Count == 0)
            {
                return BadRequest("No Services provided for deletion.");
            }

            Console.WriteLine("Authorization header: " + Request.Headers["Authorization"]);


            foreach (var Service in services)
            {

                var ServiceFromDb = await _context.Service.FirstOrDefaultAsync(r => r.Id == Service.Id);
                if (ServiceFromDb == null)
                {
                    Console.WriteLine($"User with ID: {Service.Id} not found in the database, skipping.");
                    continue;
                }




                ServiceFromDb.DeletedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();


            var newServices = await _context.Service.Where(r => r.DeletedAt == null)
                                   .ToListAsync();

            return Ok(new { message = "Service deleted successfully.", newServices });
        }



    }
}
