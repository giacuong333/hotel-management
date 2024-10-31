using backend.Models;
using Repositories.Interfaces;

public class GalleryService(IUnitOfWork unitOfWork) : IGalleryService
{
      private readonly IUnitOfWork _unitOfWork = unitOfWork;

      public async Task AddImageAsync(IFormFile file, int roomId)
      {
            await _unitOfWork.Gallery.AddImageAsync(file, roomId);
      }

      public async Task DeleteImageAsync(int id)
      {
            await _unitOfWork.Gallery.DeleteAsync(id);
      }

      public async Task<GalleryModel> GetImageByIdAsync(int id)
      {
            return await _unitOfWork.Gallery.GetByIdAsync(id);
      }

      public async Task<IEnumerable<GalleryModel>> GetImagesByRoomIdAsync(int roomId)
      {
            return await _unitOfWork.Gallery.GetImagesByRoomIdAsync(roomId);
      }

      public async Task<int> SaveAsync()
      {
            return await _unitOfWork.CompleteAsync();
      }
}
