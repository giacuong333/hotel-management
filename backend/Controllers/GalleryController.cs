using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
      [Route("[controller]")]
      [ApiController]
      public class GalleryController(IGalleryService galleryService) : Controller
      {
            private readonly IGalleryService _galleryService = galleryService;

            // [GET] /gallery/{roomId}
            [HttpGet("{roomId}")]
            [Produces("application/json")]
            public async Task<ActionResult<IEnumerable<GalleryModel>>> GetGalleriesByRoomId(int roomId)
            {
                  try
                  {
                        var existingGallery = await _galleryService.GetImagesByRoomIdAsync(roomId);
                        if (existingGallery == null)
                              return NotFound("Images not found.");

                        var gallery = existingGallery
                              .Select(g => new
                              {
                                    g.Id,
                                    g.RoomId,
                                    Image = Convert.ToBase64String(g.Image)
                              }).ToList();

                        return Ok(gallery);
                  }
                  catch (UnauthorizedException ex)
                  {
                        return Unauthorized(new { message = ex.Message });
                  }
                  catch (NotFoundException ex)
                  {
                        return NotFound(new { message = ex.Message });
                  }
                  catch (Exception ex)
                  {
                        // Log the exception
                        Console.WriteLine($"An error occurred: {ex.Message}");
                        Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                        return StatusCode(500, new { message = "Internal server error", error = ex.Message });
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
                              return BadRequest("Missing data");

                        if (file == null || file.Length > 0)
                        {
                              await _galleryService.AddImageAsync(file, roomId);
                              await _galleryService.SaveAsync();
                        }

                        return StatusCode(201, new { message = "Image added successfully" });
                  }
                  catch (UnauthorizedException ex)
                  {
                        return Unauthorized(new { message = ex.Message });
                  }
                  catch (NotFoundException ex)
                  {
                        return NotFound(new { message = ex.Message });
                  }
                  catch (Exception ex)
                  {
                        // Log the exception
                        Console.WriteLine($"An error occurred: {ex.Message}");
                        Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                        return StatusCode(500, new { message = "Internal server error", error = ex.Message });
                  }
            }

            // [DELETE] /gallery/{id}
            [HttpDelete("{id}")]
            public async Task<ActionResult<IEnumerable<GalleryModel>>> Delete(int id)
            {
                  if (!ModelState.IsValid)
                        return BadRequest(ModelState);

                  var image = await _galleryService.GetImageByIdAsync(id);
                  if (image == null)
                        return NotFound("Image not found.");

                  await _galleryService.DeleteImageAsync(id);
                  await _galleryService.SaveAsync();

                  return Ok("Image delete successfully");
            }
      }
}
