using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ServiceUsageController(IServiceUsageService serviceUsageService) : ControllerBase
    {
        private readonly IServiceUsageService _serviceUsageService = serviceUsageService;

        private static int GetUserIdFromClaims(HttpContext httpContext)
        {
            var userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim != null)
                return int.Parse(userIdClaim!.Value);

            throw new UnauthorizedAccessException("User ID not found in claims.");
        }

        // [POST] /serviceUsage
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> CreateServiceForCustomer([FromBody] ServiceUsageModel service)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Missing bookingId or userId");

                await _serviceUsageService.CreateServiceForCustomerAsync((int)service.BookingId, (int)service.ServiceId, (int)service.Quantity);
                return StatusCode(201, new { message = "Create service successfully" });
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // [DELETE] /serviceUsage
        [HttpDelete]
        public async Task<ActionResult> DeleteServiceUsage([FromBody] List<int> ids)
        {
            try
            {
                if (ids == null || !ids.Any())
                    return BadRequest("No service usage IDs provided");

                if (!ModelState.IsValid)
                    return BadRequest("Missing bookingId or userId");

                await _serviceUsageService.DeleteServiceUsageAsync(ids);
                return Ok("Service usage deleted successfully");
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error" + ex.Message);
            }
        }

        // [GET] /serviceUsage/services_used
        [HttpGet("services_used/{bookingId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ServiceUsageModel>>> GetServicesUsed(int bookingId)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Missing bookingId or userId");

                var userId = GetUserIdFromClaims(HttpContext);
                var servicesUsed = await _serviceUsageService.GetServicesUsedAsync(bookingId, userId);

                if (servicesUsed == null)
                    return NotFound(new { message = "Services used not found." });

                return Ok(servicesUsed);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
