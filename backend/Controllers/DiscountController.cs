using backend.Database;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DiscountController : Controller
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
<<<<<<< HEAD
=======
            _discountService = discountService;
>>>>>>> 6a95901db4df8ca164e3d9e7e643827f49d801d7
        }

        // GET: /discount
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DiscountModel>>> GetListDiscounts()
        {
            try
            {
                var discounts = await context.Discount.ToListAsync();

                if (discounts == null)
                {
                    return NotFound(new { message = "Discounts not found." });
                }

                return Ok(discounts);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving discounts");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: /discount/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<DiscountModel>> GetDiscount(int id)
        {
            try
            {
                var discount = await context.Discount.FindAsync(id);

                if (discount == null)
                {
                    return NotFound(new { message = "Discount not found." });
                }

                return Ok(discount);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving discount");
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

        //POST: /discount
        [HttpPost]
        public async Task<ActionResult<DiscountModel>> CreateDiscount(DiscountModel discount)
        {
            try
            {
                bool discountNameExist = await context.Discount.AnyAsync(d => d.Name == discount.Name);
                bool discountValueExist = await context.Discount.AnyAsync(d => d.Value == discount.Value);

                if (discountNameExist && discountValueExist)
                {
                    return Conflict(new { message = "Discount already exists" });
                }

                await context.Discount.AddAsync(discount);

                await context.SaveChangesAsync();
                return Ok(discount);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating discount");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST /discount/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<DiscountModel>> UpdateDiscount(int id, [FromBody] DiscountModel discount)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Missing data");
                }
                var IdDiscount = await context.Discount.FindAsync(id);
                if (discount == null)
                {
                    return NotFound("Discount not found.");
                }

                IdDiscount.Name = discount?.Name;
                IdDiscount.Value = discount?.Value;
                IdDiscount.Status = discount?.Status;
                IdDiscount.StartAt = discount?.StartAt;
                IdDiscount.EndAt = discount?.EndAt;

                context.Discount.Update(IdDiscount);
                await context.SaveChangesAsync();

                return Ok(IdDiscount);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error updating discount");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE /discount/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<DiscountModel>> DeleteDiscount(int id)
        {
            try
            {
                var discount = await context.Discount.FindAsync(id);

                if (discount == null)
                {
                    return NotFound(new { message = "Discount not found" });
                }

                context.Discount.Remove(discount);
                await context.SaveChangesAsync();

                return Ok(discount);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error deleting discount");
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
                var discountsToDelete = await context.Discount
                    .Where(d => discountIds.Contains((int)d.Id))
                    .ToListAsync();

                if (!discountsToDelete.Any())
                {
                    return NotFound(new { message = "No discounts found to delete" });
                }

                context.Discount.RemoveRange(discountsToDelete);
                await context.SaveChangesAsync();

                return Ok(new { message = "Discounts deleted successfully", newDiscounts = context.Discount.ToList() });
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error deleting discounts");
                return StatusCode(500, "Internal server error");
            }
        }
        public IActionResult Index()
        {
            return View();
        }

    }
}
