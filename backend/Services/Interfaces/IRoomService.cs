
using backend.Models;

public interface IRoomService
{
      Task<IEnumerable<RoomModel>> GetRoomsAsync();
      Task<IEnumerable<RoomModel>> GetEmptyRoomsAsync();
      Task<RoomModel> GetRoomByIdAsync(object id);
      Task CreateRoomAsync(RoomModel room);
      Task UpdateRoomAsync(RoomModel room);
      Task DeleteRoomAsync(object id);
      Task SaveAsync();
}