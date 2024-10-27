using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implementations
{
      public class BookingRepository : GenericRepository<BookingModel>, IBookingRepository
      {
            public BookingRepository(DatabaseContext context) : base(context) { }

            public async Task<IEnumerable<BookingModel>> GetBookingsAsync()
            {
                  return await _context.Booking
                                    .Include(b => b.BookingDetails)
                                          .ThenInclude(bd => bd!.Room)
                                    .Include(b => b.Customer)
                                    .Include(b => b.StaffCheckIn)
                                    .Include(b => b.StaffCheckOut)
                                    .Where(b => b.DeletedAt == null)
                                    .ToListAsync();
            }
      }
}