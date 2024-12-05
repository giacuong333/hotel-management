using AspNetCoreGeneratedDocument;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ReceiptController(IReceiptService receiptService) : ControllerBase
    {
        private readonly IReceiptService _receiptService = receiptService;

        // [GET] /receipt
        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<ReceiptModel>>> GetReceipts()
        {
            try
            {
                var receipts = await _receiptService.GetReceiptsAsync();
                if (receipts == null)
                    return NotFound("Receipts not found");

                return Ok(receipts);
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

        // [GET] /receipt/{receiptId}
        [HttpGet("{receiptId}")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<ReceiptModel>>> GetReceiptsById(int receiptId)
        {
            try
            {
                var receipts = await _receiptService.GetReceiptsByIdAsync(receiptId);
                if (receipts == null)
                    return NotFound("Receipts not found");

                return Ok(receipts);
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

        // [GET] /receipt/booking/{bookingId}
        [HttpGet("booking/{bookingId}")]
        [Produces("application/json")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ReceiptModel>>> GetReceiptByBookingId(int bookingId)
        {
            try
            {
                var receipt = await _receiptService.GetReceiptByBookingIdAsync(bookingId);
                if (receipt == null)
                    return NotFound("Receipts not found");

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

        // [DELETE] /receipt/{id}
        [HttpDelete("{id}")]
        [Produces("application/json")]
        public async Task<ActionResult> DeleteReceipt(int id)
        {
            try
            {
                await _receiptService.DeleteReceiptByIdAsync(id);

                return Ok("Receipt deleted successfully");
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

        // [DELETE] /receipt
        [HttpDelete]
        public async Task<ActionResult> DeleteReceipts([FromBody] IList<ReceiptModel> receiptIds)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Missing Data");

                await _receiptService.DeleteReceiptsAsync(receiptIds);

                var newReceipts = await _receiptService.GetReceiptsAsync();

                return Ok(new { message = "Receipts deleted successfully", newReceipts });
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