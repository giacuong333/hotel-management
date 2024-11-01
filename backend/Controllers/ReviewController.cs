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
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {


        private readonly IReviewService _reviewService;

        public ReviewController(IReviewService reviewService)
        {


            _reviewService = reviewService;
        }

        // [GET] /review
        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<ReviewModel>>> GetReviews()
        {
            try
            {
                var reviews = await _reviewService.GetReviewsAsync();

                if (reviews == null)
                {
                    return NotFound(new { message = "Reviews not found." });
                }

                return Ok(reviews);
            }
            catch (Exception e)
            {

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
                var review = await _reviewService.GetReviewByIdAsync(id);

                if (review == null)
                {
                    return NotFound();
                }

                return Ok(review);
            }
            catch (Exception e)
            {

                return StatusCode(500, "Internal server error");
            }
        }
        /*
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

        */
        // [DELETE] /review/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<ReviewModel>>> DeleteReviewById(int id)
        {
            try
            {
                var review = await _reviewService.GetReviewByIdAsync(id);

                if (review == null)
                {
                    return NotFound(new { message = "Review not found." });
                }
                await _reviewService.DeleteReviewAsync(review.Id);




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

                var reviewFromDb = await _reviewService.GetReviewByIdAsync(review.Id);
                if (reviewFromDb == null)
                {
                    Console.WriteLine($"User with ID: {review.Id} not found in the database, skipping.");
                    continue;
                }




                await _reviewService.DeleteReviewAsync(reviewFromDb.Id);
            }




            var newReviews = await _reviewService.GetReviewsAsync();

            return Ok(new { message = "Review deleted successfully.", newReviews });
        }



    }
}
