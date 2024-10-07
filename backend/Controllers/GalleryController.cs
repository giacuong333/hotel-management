using backend.Database;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GalleryController(DatabaseContext context, ILogger<DiscountController> logger, IConfiguration configuration) : Controller
    {
        private readonly DatabaseContext _context = context;
        private readonly ILogger<DiscountController> _logger = logger;
        private readonly IConfiguration configuration = configuration;

        // [GET] /gallery/{roomId}
        [HttpGet("{roomId}")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<GalleryModel>>> GetGalleriesByRoomId(int roomId)
        {
            try
            {
                var existingGallery = await _context.Gallery.Where(g => g.RoomId == roomId).ToListAsync();

                if (existingGallery == null)
                {
                    return Util.NotFoundResponse("Image not found.");
                }

                var gallery = existingGallery.Select(g => new { g.Id, g.RoomId, Image = Convert.ToBase64String(g.Image) }).ToList();

                return Util.OkResponse(gallery);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving galleries");
                return Util.InternalServerErrorResponse("Internal server error");
            }
        }

        // [POST] /gallery
        [HttpPost]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<GalleryModel>>> Create([FromForm] IFormFile file, [FromForm] int roomId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return Util.BadRequestResponse("Missing data");
                }

                if (file == null || file.Length > 0)
                {
                    using var ms = new MemoryStream();
                    await file.CopyToAsync(ms);
                    var imageData = ms.ToArray();

                    var newGallery = new GalleryModel
                    {
                        RoomId = roomId,
                        Image = imageData
                    };


                    _context.Gallery.Add(newGallery);
                    await _context.SaveChangesAsync();
                }

                return Util.CreatedResponse(new { message = "Image added successfully" });
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error retrieving galleries");
                return Util.InternalServerErrorResponse("Internal server error");
            }
        }

        // [DELETE] /gallery/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<IEnumerable<GalleryModel>>> Delete(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var image = await _context.Gallery.FindAsync(id);

            if (image == null)
            {
                return Util.NotFoundResponse("Image not found.");
            }

            _context.Gallery.Remove(image);
            await _context.SaveChangesAsync();

            return Util.OkResponse("Image delete successfully");
        }
    }
}
