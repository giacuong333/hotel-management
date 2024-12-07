using backend.Models;

namespace backend.Services.Interfaces
{
    public interface ILockRoomService
    {
        Task<IEnumerable<LockRoomModel>> GetLockRoomsAsync();
        Task<LockRoomModel> GetLockRoomAsync();
        Task CreateLockRoomAsync(LockRoomModel lockRoom);
        Task DeleteLockRoomAsync(int lockRoomId);
    }
}
