using backend.Models;
using Repositories.Interfaces;

public class GalleryService : IGalleryService
{
      private readonly IGalleryRepository _galleryRepository;
      private readonly IConfiguration _configuration;
      private readonly ILogger<GalleryService> _logger;

      public GalleryService(IGalleryRepository galleryRepository, IConfiguration configuration, ILogger<GalleryService> logger)
      {
            _galleryRepository = galleryRepository;
            _configuration = configuration;
            _logger = logger;
      }

      public async Task AddImageAsync(IFormFile file, int roomId)
      {
            await _galleryRepository.AddImageAsync(file, roomId);
      }

      public async Task DeleteImageAsync(int id)
      {
            await _galleryRepository.DeleteAsync(id);
      }

      public async Task<GalleryModel> GetImageByIdAsync(int id)
      {
            return await _galleryRepository.GetByIdAsync(id);
      }

      public async Task<IEnumerable<GalleryModel>> GetImagesByRoomIdAsync(int roomId)
      {
            return await _galleryRepository.GetImagesByRoomIdAsync(roomId);
      }

      public async Task SaveAsync()
      {
            await _galleryRepository.SaveAsync();
      }
}
