using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {


        private readonly IReviewService _reviewService;
        private readonly IBookingService _bookingService;


        public ReviewController(IReviewService reviewService, IBookingService bookingService)
        {


            _reviewService = reviewService;
            _bookingService = bookingService;
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

        // [GET] /reviewbyroomid
        [HttpGet("getReviewsByRoomId")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<object>>> GetReviewsByRoomId(int roomId)
        {
            try
            {
                var reviews = await _reviewService.GetReviewsByRoomIdAsync(roomId);

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


                var newReview = new ReviewModel
                {
                    UserId = review.UserId,
                    RoomId = review.RoomId,
                    Comment = review.Comment,
                    CreatedAt = DateTime.UtcNow,
                    Status = 0,
                };


                var checkCustomer = await _bookingService.CheckCustomerCheckedOutAsync(int.Parse(review.UserId.ToString()), int.Parse(review.RoomId.ToString()));


                if (checkCustomer != null)
                {
                    await _reviewService.CreateReviewAsync(newReview);
                    return StatusCode(201, new { message = "Review added successfully" });
                }
                else
                {

                    return StatusCode(202, new { message = "You must stay in this room before leaving a review" });
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);

                return StatusCode(500, new { message = "Internal server error" });
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
