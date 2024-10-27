
using backend.Models;

public interface IGalleryService
{
      Task<IEnumerable<GalleryModel>> GetImagesByRoomIdAsync(int roomId);
      Task<GalleryModel> GetImageByIdAsync(int id);
      Task AddImageAsync(IFormFile file, int roomId);
      Task DeleteImageAsync(int id);
      Task SaveAsync();
}