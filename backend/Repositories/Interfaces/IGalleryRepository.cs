using backend.Models;
using Interfaces;

namespace Repositories.Interfaces
{
      public interface IGalleryRepository : IGenericRepository<GalleryModel>
      {
            Task AddImageAsync(IFormFile file, int roomId);
            Task<IEnumerable<GalleryModel>> GetImagesByRoomIdAsync(int roomId);
      }
}