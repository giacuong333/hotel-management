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
            var lockRoom = await _context.LockRoom.FindAsync(lockRoomId);
            if (lockRoom != null)
            {
                _context.LockRoom.Remove(lockRoom);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new KeyNotFoundException($"LockRoom with ID {lockRoomId} not found.");
            }
        }

        public async Task<LockRoomModel> GetLockRoomAsync(int lockRoomId)
        {
            var lockRoom = await _context.LockRoom
                .Include(lr => lr.Room) 
                .FirstOrDefaultAsync(lr => lr.Id == lockRoomId);

            if (lockRoom == null)
            {
                throw new KeyNotFoundException($"LockRoom with ID {lockRoomId} not found.");
            }

            return lockRoom;
        }

        public async Task<IEnumerable<LockRoomModel>> GetLockRoomsAsync()
        {
            return await _context.LockRoom
                .Include(lr => lr.Room) 
                .ToListAsync();
        }
    }
}
