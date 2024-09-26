using backend.Database;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GalleryController : Controller
    {
        private readonly DatabaseContext context;
        private readonly ILogger<DiscountController> _logger;
        private readonly IConfiguration configuration;
        public GalleryController(DatabaseContext context, ILogger<DiscountController> logger, IConfiguration configuration)
        {
            this.context = context;
            this._logger = logger;
            this.configuration = configuration;
        }

        // GET: /gallery
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GalleryModel>>> GetListGalleries()
        {
            try
            {
                var galleries = await context.Gallery.ToListAsync();
                return Ok(galleries);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving galleries");
                return StatusCode(500, "Internal server error");
            }
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
