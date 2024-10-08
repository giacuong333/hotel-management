﻿using backend.Database;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FeedBackController : Controller
    {
        private readonly DatabaseContext context;
        private readonly ILogger<DiscountController> _logger;
        private readonly IConfiguration configuration;
        public FeedBackController(DatabaseContext context, ILogger<DiscountController> logger, IConfiguration configuration)
        {
            this.context = context;
            this._logger = logger;
            this.configuration = configuration;
        }

        // GET: /feedback
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeedBackModel>>> GetListFeedBacks()
        {
            try
            {
                var feedbacks = await context.Feedback.ToListAsync();
                return Ok(feedbacks);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving feedbacks");
                return StatusCode(500, "Internal server error");
            }
        }
        // DELETE: /feedback/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<FeedBackModel>> DeleteFeedBack(int id)
        {
            try
            {
                var feedback = await context.Feedback.FindAsync(id);
                if (feedback == null)
                {
                    return NotFound(new { message = "Feedback not found" });
                }
                context.Feedback.Remove(feedback);
                await context.SaveChangesAsync();
                return Ok(feedback);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error deleting feedback");
                return StatusCode(500, "Internal server error");
            }
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
