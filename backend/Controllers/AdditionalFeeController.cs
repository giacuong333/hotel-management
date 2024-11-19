using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdditionalFeeController(IAdditionalFeeService additionalFeeService) : ControllerBase
    {
        private readonly IAdditionalFeeService _additionalFeeService = additionalFeeService;

        // [GET] /additionalFee/{receiptId}
        [HttpGet("{receiptId}")]
        [Produces("application/json")]
        public async Task<ActionResult> CreateAdditionalFee(int receiptId)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Missing data");

                var receipt = await _additionalFeeService.GetAdditionalFeesByReceiptId(receiptId);
                if (receipt == null)
                    return NotFound("Receipt not found");

                return Ok(receipt);
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        // [POST] /additionalFee
        [HttpPost]
        [Produces("application/json")]
        public async Task<ActionResult> CreateAdditionalFee([FromBody] AdditionalFeeModel additionalFee)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Missing data");

                await _additionalFeeService.CreateAdditionalFee(additionalFee);

                return StatusCode(201, new { message = "Created additional fee successfully" });
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        // [PUT] /additionalFee/{receiptId}
        [HttpPut("{receiptId}")]
        [Produces("application/json")]
        public async Task<ActionResult> UpdateAdditionalFee([FromBody] AdditionalFeeModel additionalFee, int receiptId)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Missing data");

                await _additionalFeeService.UpdateAdditionalFee(additionalFee, receiptId);

                return Ok("Updated additional fee successfully");
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        // [DELETE] /additionalFee/{receiptId}/{additionalFeeId}
        [HttpDelete("{receiptId}/{additionalFeeId}")]
        public async Task<ActionResult> DeleteAdditionalFee(int receiptId, int additionalFeeId)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Missing data");

                await _additionalFeeService.DeleteAdditionalFeeById(receiptId, additionalFeeId);

                return Ok("Delete additional fee successfully");
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        // [DELETE] /additionalFee
        [HttpDelete]
        public async Task<ActionResult> DeleteAdditionalFees([FromBody] List<int> additionalFeeIds)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Missing data");

                await _additionalFeeService.DeleteAdditionalFees(additionalFeeIds);

                return Ok("Delete additional fees successfully");
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }
    }
}