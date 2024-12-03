using backend.Database;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FeedBackController : Controller
    {
        private readonly IFeedBackService _feedBackService;
        public FeedBackController(IFeedBackService feedBackService)
        {
            _feedBackService = feedBackService;
        }
        

        // GET: /feedback
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetListFeedBacks()
        {
            try
            {
                var feedbacks = await _feedBackService.GetListFeedBacks();
                return Ok(feedbacks);
            }
            catch (Exception e)
            {
                
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<FeedBackModel>> GetFeedBack(int id)
        {
            try
            {
                var feedback = await _feedBackService.GetFeedBack(id);

                if (feedback == null)
                {
                    return NotFound(new { message = "FeedBack not found." });
                }

                return Ok(feedback);
            }
            catch (Exception e)
            {
                
                return StatusCode(500, "Internal server error");
            }
        }
        // DELETE: /feedback/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<FeedBackModel>> DeleteFeedBack(int id)
        {
            try
            {
                var feedback = await _feedBackService.DeleteFeedBack(id);
                return Ok(feedback);
            }
            catch (Exception e)
            {
                
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAllFeedbacks([FromBody] List<int> feedbackIds)
        {
            try
            {
                await _feedBackService.DeleteAllFeedBacks(feedbackIds);

                return Ok(new { message = "Feedbacks deleted successfully", newFeedback = _feedBackService.GetListFeedBacks() });
            }
            catch (Exception e)
            {
               
                return StatusCode(500, "Internal server error");
            }
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
