using backend.Models;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class LockRoomService(IUnitOfWork unitOfWork) : ILockRoomService
    {
        public Task CreateLockRoomAsync(LockRoomModel lockRoom)
        {
            throw new NotImplementedException();
        }

        public Task DeleteLockRoomAsync(int lockRoomId)
        {
            throw new NotImplementedException();
        }

        public Task<LockRoomModel> GetLockRoomAsync()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<LockRoomModel>> GetLockRoomsAsync()
        {
            throw new NotImplementedException();
        }
    }
}
