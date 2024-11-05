using backend.Database;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implementations
{
      public class DashboardRepository : IDashboardRepository
      {
        protected readonly DatabaseContext _context;
        private readonly DbSet<RoomModel> _dbSetRoom;
        private readonly DbSet<BookingModel> _dbSetBooking;


        public DashboardRepository(DatabaseContext context)
        {
            _context = context;
            _dbSetRoom = context.Set<RoomModel>();
            _dbSetBooking = context.Set<BookingModel>();

        }


        public async Task<IEnumerable<RoomModel>> GetAvailableRoomsAsync()
        {
       
            return await _dbSetRoom
                .Where(r => r.DeletedAt == null && r.Status == 1 )
                .ToListAsync();
        }

        public async Task<IEnumerable<BookingModel>> GetBookingDetailsAsync()
        {
            var today = DateTime.Today;
            return await _dbSetBooking.Where(bk => bk.DeletedAt == null  && bk.CreatedAt >= today && bk.CreatedAt < today.AddDays(1)).OrderByDescending(bk => bk.CheckIn == null)
                     .ToListAsync();
        }

  

        public async Task<IEnumerable<BookingModel>> GetCancellationsAsync()
        {
            var today = DateTime.Today;
            return await _dbSetBooking.Where(bk => bk.Status == 0 && bk.CreatedAt >= today && bk.CreatedAt < today.AddDays(1))
                     .ToListAsync();
        }

        public async Task<IEnumerable<BookingModel>> GetPendingPaymentsAsync()
        {
            var today = DateTime.Today;
            return await _dbSetBooking.Where(bk => bk.DeletedAt == null && bk.Status != 0 && bk.CheckIn == null  && bk.CreatedAt >= today && bk.CreatedAt < today.AddDays(1))
                    .ToListAsync();
        }

        public async Task<IEnumerable<BookingModel>> GetTodayCheckoutsAsync()
        {
            var today = DateTime.Today;
            return await _dbSetBooking.Where(bk => bk.DeletedAt == null && bk.Status != 0 && bk.CheckIn != null && bk.CheckOut != null && bk.CreatedAt >= today && bk.CreatedAt < today.AddDays(1))
                    .ToListAsync();
        }
    }
}