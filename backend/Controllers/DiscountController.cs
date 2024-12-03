using backend.Database;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Repositories.Interfaces;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly DatabaseContext context;
        private readonly ILogger<DiscountController> _logger;
        private readonly IConfiguration configuration;
        private readonly IDiscountService _discountService;
       

        public DiscountController(DatabaseContext context, ILogger<DiscountController> logger, IConfiguration configuration, IDiscountService discountService)
        {
            this.context = context;
            this._logger = logger;
            this.configuration = configuration;
            _discountService = discountService;
        }

        // GET: /discount
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DiscountModel>>> GetListDiscounts()
        {
            try
            {
                var discounts = await _discountService.GetListDiscounts();

                if (discounts == null)
                {
                    return NotFound(new { message = "Discounts not found." });
                }

                return Ok(discounts);
            }
            catch (Exception e)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: /discount/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<DiscountModel>> GetDiscount(int id)
        {
            try
            {
                var discount = await _discountService.GetDiscount(id);

                if (discount == null)
                {
                    return NotFound(new { message = "Discount not found." });
                }

                return Ok(discount);
            }
            catch (Exception e)
            {

                return StatusCode(500, "Internal server error");
            }
        }

        //POST: /discount
        [HttpPost]
        public async Task<ActionResult<DiscountModel>> CreateDiscount(DiscountModel discount)
        {
            try
            {
                var newDiscount = await _discountService.CreateDiscount(discount);
                return Ok(newDiscount);
            }
            catch (Exception e)
            {

                return StatusCode(500, "Internal server error");
            }
        }

        // POST /discount/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<DiscountModel>> UpdateDiscount(int id, [FromBody] DiscountModel discount)
        {
            try
            {
                var IdDiscount = await _discountService.UpdateDiscount(id, discount);

                return Ok(IdDiscount);
            }
            catch (Exception e)
            {

                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE /discount/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<DiscountModel>> DeleteDiscount(int id)
        {
            try
            {
                var discount = await _discountService.DeleteDiscount(id);

                return Ok(discount);
            }
            catch (Exception e)
            {

                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete]

        [HttpDelete("deleteall")]
        public async Task<IActionResult> DeleteAllDiscounts([FromBody] List<int> discountIds)
        {
            if (discountIds == null || !discountIds.Any())
            {
                return BadRequest(new { message = "Invalid payload" });
            }

            try
            {
                await _discountService.DeleteAllDiscounts(discountIds);

                return Ok(new { message = "Discounts deleted successfully", newDiscounts = _discountService.GetListDiscounts() });
            }
            catch (Exception e)
            {

                return StatusCode(500, "Internal server error");
            }
        }

        // GET: /discount/active}
        [HttpGet("active")]
        public async Task<ActionResult<DiscountModel>> GetActiveDiscounts()
        {
            try
            {
                var discounts = await _discountService.GetListActiveDiscounts();

                if (discounts == null)
                {
                    return NotFound(new { message = "Active discounts not found." });
                }

                return Ok(discounts);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving discount");

                return StatusCode(500, "Internal server error");
            }
        }
    }
}
