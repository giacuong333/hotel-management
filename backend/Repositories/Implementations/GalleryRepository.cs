using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implementations
{
      public class GalleryRepository : GenericRepository<GalleryModel>, IGalleryRepository
      {
            public GalleryRepository(DatabaseContext context) : base(context) { }

            public async Task AddImageAsync(IFormFile file, int roomId)
            {
                  using var ms = new MemoryStream();
                  await file.CopyToAsync(ms);
                  var imageData = ms.ToArray();

                  var newGallery = new GalleryModel
                  {
                        RoomId = roomId,
                        Image = imageData
                  };

                  await CreateAsync(newGallery);
            }

            public async Task<IEnumerable<GalleryModel>> GetImagesByRoomIdAsync(int roomId)
            {
                  return await _context.Gallery
                        .Where(g => g.RoomId == roomId)
                        .ToListAsync();
            }
      }
}