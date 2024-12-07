using backend.Models;
using Interfaces;

namespace backend.Repositories.Interfaces
{
    public interface ILockRoomRepository : IGenericRepository<LockRoomModel>
    {
        Task<IEnumerable<LockRoomModel>> GetLockRoomsAsync();
        Task<LockRoomModel> GetLockRoomAsync();
        Task CreateLockRoomAsync(LockRoomModel lockRoom);
        Task DeleteLockRoomAsync(int lockRoomId);
    }
}
