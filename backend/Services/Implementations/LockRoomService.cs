using backend.Models;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class LockRoomService : ILockRoomService
    {
        private readonly IUnitOfWork _unitOfWork;

        public LockRoomService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task CreateLockRoomAsync(LockRoomModel lockRoom)
        {
            await _unitOfWork.LockRooms.CreateLockRoomAsync(lockRoom);
            await _unitOfWork.CompleteAsync();
        }

        public async Task DeleteLockRoomAsync(int lockRoomId)
        {
            await _unitOfWork.LockRooms.DeleteLockRoomAsync(lockRoomId);
            await _unitOfWork.CompleteAsync();
        }

        public async Task<LockRoomModel> GetLockRoomAsync(int lockRoomId)
        {
            return await _unitOfWork.LockRooms.GetLockRoomAsync(lockRoomId);
        }

        public async Task<IEnumerable<LockRoomModel>> GetLockRoomsAsync()
        {
            return await _unitOfWork.LockRooms.GetLockRoomsAsync();
        }
    }
}
