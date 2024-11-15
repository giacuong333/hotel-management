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
    }
}
