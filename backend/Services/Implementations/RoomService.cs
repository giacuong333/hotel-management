using backend.Models;
using Repositories.Interfaces;

public class RoomService(IUnitOfWork unitOfWork) : IRoomService
{
      private readonly IUnitOfWork _unitOfWork = unitOfWork;

      public async Task CreateRoomAsync(RoomModel room)
      {
            await _unitOfWork.Rooms.CreateAsync(room);
      }

      public async Task DeleteRoomAsync(object id)
      {
            await _unitOfWork.Rooms.DeleteAsync(id);
      }

      public async Task<RoomModel> GetRoomByIdAsync(object id)
      {
            return await _unitOfWork.Rooms.GetByIdAsync(id);
      }

      public async Task<IEnumerable<RoomModel>> GetRoomsAsync()
      {
            return await _unitOfWork.Rooms.GetAllAsync();
      }

      public async Task<int> SaveAsync()
      {
            return await _unitOfWork.CompleteAsync();
      }

      public async Task UpdateRoomAsync(RoomModel user)
      {
            await _unitOfWork.Rooms.UpdateAsync(user);
      }
}
