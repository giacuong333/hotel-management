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

        public DiscountController(DatabaseContext context, ILogger<DiscountController> logger, IConfiguration configuration)
        {
            this.context = context;
            this._logger = logger;
            this.configuration = configuration; 
        }

        // GET: /discount
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DiscountModel>>> GetListDiscounts()
        {
            try
            {
                var discounts = await context.Discount.ToListAsync();
                return Ok(discounts);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving discounts");
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
                bool discountValueExist = await context.Discount.AnyAsync(d => d.Value== discount.Value);

                if (discountNameExist && discountValueExist)
                {
                    return Conflict(new {message = "Discount already exists" });
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
        public async Task<ActionResult<DiscountModel>> UpdateDiscount(int id, DiscountModel discount)
        {
            try
            {
                var IdDiscount = await context.Discount.FindAsync(id);

                if (IdDiscount == null)
                {
                    return NotFound(new { message = "Discount not found" });
                }
                
                IdDiscount.Name = discount.Name;
                IdDiscount.Value = discount.Value;

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

        public IActionResult Index()
        {
            return View();
        }
    }
}
