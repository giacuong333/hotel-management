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
    public class ServiceController : ControllerBase
    {
        private readonly IServiceService _serviceService;
        public ServiceController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        // [GET] /Service
        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<ServiceModel>>> GetServices()
        {
            try
            {
                var services = await _serviceService.GetServicesAsync();

                if (services == null)
                {
                    return NotFound(new { message = "Services not found." });
                }

                return Ok(services);
            }
            catch (Exception e)
            {

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
                var services = await _serviceService.GetServicesActiveAsync();

                if (services == null)
                {
                    return NotFound(new { message = "Services not found." });
                }

                return Ok(services);
            }
            catch (Exception e)
            {

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
                var service = await _serviceService.GetServiceByIdAsync(id);

                if (service == null)
                {
                    return NotFound();
                }

                return Ok(service);
            }
            catch (Exception e)
            {

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



                await _serviceService.CreateServiceAsync(newService);


                return StatusCode(201, new { message = "Service added successfully", newService });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, new { message = "Internal server error" });
            }
        }



        // [PUT] /service
        [HttpPut("{id}")]
        [Produces("application/json")]
        public async Task<ActionResult<ICollection<ServiceModel>>> EditService([FromBody] ServiceModel payload, int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var currentService = await _serviceService.GetServiceByIdAsync(id);

                if (currentService == null)
                {
                    return NotFound("Service not found");
                }
                currentService.Name = payload.Name;
                currentService.Price = payload.Price;
                currentService.Status = payload.Status;

                currentService.UpdatedAt = DateTime.UtcNow;

                await _serviceService.UpdateServiceAsync(currentService);


                return Ok(new { message = "Servuce updated successfully", currentService });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, new { message = "Internal server error" });
            }
        }


        // [DELETE] /Service/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<ServiceModel>>> DeleteServiceById(int id)
        {
            try
            {
                var service = await _serviceService.GetServiceByIdAsync(id);

                if (service == null)
                {
                    return NotFound(new { message = "Service not found." });
                }
                await _serviceService.DeleteServiceAsync(service.Id);




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

                var ServiceFromDb = await _serviceService.GetServiceByIdAsync(Service.Id);
                if (ServiceFromDb == null)
                {
                    return NotFound("Servicc not found");

                }
                await _serviceService.DeleteServiceAsync(Service.Id);





            }




            var newServices = await _serviceService.GetServicesAsync();

            return Ok(new { message = "Service deleted successfully.", newServices });
        }



    }
}
