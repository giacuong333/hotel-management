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
        private readonly IFeedBackRepository _feedBackRepository;
        public FeedBackController(IFeedBackRepository feedBackRepository)
        {
            _feedBackRepository = feedBackRepository;
        }
        

        // GET: /feedback
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetListFeedBacks()
        {
            try
            {
                var feedbacks = await _feedBackRepository.GetListFeedBacks();
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
                var feedback = await _feedBackRepository.GetFeedBack(id);

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
                var feedback = await _feedBackRepository.DeleteFeedBack(id);
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
                await _feedBackRepository.DeleteAllFeedBacks(feedbackIds);

                return Ok(new { message = "Feedbacks deleted successfully", newFeedback = _feedBackRepository.GetListFeedBacks() });
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
