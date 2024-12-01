using backend.Database;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly IDiscountRepository _discountRepository;

        public DiscountController(IDiscountRepository discountRepository)
        {
            _discountRepository = discountRepository;
        }
        

        // GET: /discount
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DiscountModel>>> GetListDiscounts()
        {
            try
            {
                var discounts = await _discountRepository.GetListDiscounts();

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
                var discount = await _discountRepository.GetDiscount(id);

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
                var newDiscount = await _discountRepository.CreateDiscount(discount);
                return Ok(newDiscount);
            }
            catch (Exception e)
            {
               
                return StatusCode(500, "Internal server error");
            }
        }

        // POST /discount/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<DiscountModel>> UpdateDiscount(int id,[FromBody] DiscountModel discount)
        {
            try
            {
                var IdDiscount = await _discountRepository.UpdateDiscount(id, discount);

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
                var discount = await _discountRepository.DeleteDiscount(id);

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
               await _discountRepository.DeleteAllDiscounts(discountIds);

                return Ok(new { message = "Discounts deleted successfully", newDiscounts = _discountRepository.GetListDiscounts() });
            }
            catch (Exception e)
            {
               
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
