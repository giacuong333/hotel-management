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
    public class ReviewController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly ILogger<ReviewController> _logger;
        private readonly IConfiguration _configuration;

        public ReviewController(DatabaseContext context, ILogger<ReviewController> logger, IConfiguration configuration)
        {
            _context = context;
            _logger = logger;
            _configuration = configuration;
        }

        // [GET] /review
        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<ReviewModel>>> GetReviews()
        {
            try
            {
                var reviews = await _context.Review.Where(r => r.DeletedAt == null)
                      .Include(r => r.Users).Include(r => r.Rooms)
                      .ToListAsync();

                if (reviews == null)
                {
                    return NotFound(new { message = "Reviews not found." });
                }

                return Ok(reviews);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving reviews");
                return StatusCode(500, "Internal server error");
            }
        }


        // [GET] /review/{id}
        [HttpGet("{id}")]
        [Produces("application/json")]
        public async Task<ActionResult<ReviewModel>> GetReviewById(int id)
        {
            try
            {
                var review = await _context.Review.Include(r => r.Users).Include(r => r.Rooms).FirstOrDefaultAsync(r => r.Id == id);

                if (review == null)
                {
                    return NotFound();
                }

                return Ok(review);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving review");
                return StatusCode(500, "Internal server error");
            }
        }

        // [POST] /review
        [HttpPost]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<ReviewModel>>> CreateReview([FromBody] ReviewModel review)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }



                await _context.Review.AddAsync(review);
                await _context.SaveChangesAsync();

                return StatusCode(201, new { message = "Review added successfully" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, new { message = "Internal server error" });
            }
        }


        // [DELETE] /review/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<ReviewModel>>> DeleteReviewById(int id)
        {
            try
            {
                var review = await _context.Review.FindAsync(id);

                if (review == null)
                {
                    return NotFound(new { message = "Review not found." });
                }
                review.DeletedAt = DateTime.UtcNow;


                await _context.SaveChangesAsync();

                return Ok(new { message = "Review deleted successfully" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, "Internal server error");
            }
        }


        // [GET] /review
        [HttpDelete]
        public async Task<ActionResult> DeleteUsers([FromBody] List<ReviewModel> reviews)
        {
            if (reviews == null || reviews.Count == 0)
            {
                return BadRequest("No reviews provided for deletion.");
            }

            Console.WriteLine("Authorization header: " + Request.Headers["Authorization"]);


            foreach (var review in reviews)
            {
               
                var reviewFromDb = await _context.Review.FirstOrDefaultAsync(r => r.Id == review.Id);
                if (reviewFromDb == null)
                {
                    Console.WriteLine($"User with ID: {review.Id} not found in the database, skipping.");
                    continue;
                }

              


                reviewFromDb.DeletedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();


            var newReviews = await _context.Review.Where(r => r.DeletedAt == null)
                              .Include(r => r.Users).Include(r => r.Rooms).ToListAsync();

            return Ok(new { message = "Review deleted successfully.", newReviews });
        }



    }
}
