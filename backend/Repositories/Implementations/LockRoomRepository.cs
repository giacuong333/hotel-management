using backend.Database;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Repositories.Implementations;
using Repositories.Interfaces;

namespace backend.Repositories.Implementations
{
    public class LockRoomRepository : GenericRepository<LockRoomModel>, ILockRoomRepository
    {
        public LockRoomRepository(DatabaseContext context) : base(context) {}

        public async Task CreateLockRoomAsync(LockRoomModel lockRoom)
        {
            await _context.LockRoom.AddAsync(lockRoom); 
            await _context.SaveChangesAsync();
        }

        public async Task DeleteLockRoomAsync(int lockRoomId)
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
