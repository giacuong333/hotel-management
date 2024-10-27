using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implementations
{
      public class BookingRepository : GenericRepository<BookingModel>, IBookingRepository
      {
            public BookingRepository(DatabaseContext context) : base(context) { }

            public async Task ChangeBookingStatus(BookingModel booking, int status)
            {
                  var transaction = await _context.Database.BeginTransactionAsync();
                  try
                  {
                        booking.Status = status;

                        if (booking.BookingDetails != null)
                        {
                              foreach (var bookingDetail in booking.BookingDetails)
                              {
                                    var room = await _context.Room.FindAsync(bookingDetail.RoomId);
                                    if (room != null)
                                    {
                                          switch (status)
                                          {
                                                case 1: // Confirmed
                                                      room.Status = 2; // Booked
                                                      break;
                                                case 2: // Check-in
                                                      room.Status = 3; // Staying
                                                      break;
                                                case 3: // Check-out
                                                      room.Status = 1; // Empty
                                                      break;
                                                case 0:
                                                      room.Status = 1; // Empty
                                                      break;
                                                default:
                                                      break;
                                          }
                                          _context.Room.Update(room);
                                    }
                              }
                        }

                        await _context.SaveChangesAsync();

                        if (status == 3 || status == 0)
                              foreach (var bookingDetail in booking.BookingDetails.Where(bd => bd.BookingId == booking.Id))
                                    _context.BookingDetail.Remove(bookingDetail);

                        await UpdateAsync(booking);
                        await SaveAsync();
                        await transaction.CommitAsync();
                  }
                  catch
                  {
                        await transaction.RollbackAsync();
                        throw;
                  }
            }

            public async Task<BookingModel> GetBookingByIdAsync(object id)
            {
                  return await _context.Booking
                              .Include(b => b.BookingDetails)
                                    .ThenInclude(bd => bd!.Room)
                              .Include(b => b.Customer)
                              .Include(b => b.StaffCheckIn)
                              .Include(b => b.StaffCheckOut)
                              .Where(b => b.DeletedAt == null)
                              .FirstOrDefaultAsync(b => b.Id == (int)id);
            }

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