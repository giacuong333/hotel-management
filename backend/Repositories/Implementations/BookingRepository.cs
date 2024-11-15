using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implementations
{
      public class BookingRepository : GenericRepository<BookingModel>, IBookingRepository
      {
            public BookingRepository(DatabaseContext context) : base(context) { }

            public async Task ChangeBookingStatus(BookingModel booking, int status, int staffCheckOutId)
            {
                  var transaction = await _context.Database.BeginTransactionAsync();
                  try
                  {
                        booking.Status = status;
                        booking.StaffCheckOutId = staffCheckOutId;

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
                        await transaction.CommitAsync();
                  }
                  catch
                  {
                        await transaction.RollbackAsync();
                        throw;
                  }
            }

            public async Task CreateBookingAsync(BookingModel booking)
            {
                  var transaction = await _context.Database.BeginTransactionAsync();
                  try
                  {
                        await transaction.CommitAsync();
                  }
                  catch
                  {
                        await transaction.RollbackAsync();
                        throw;
                  }
            }

            // public async Task DeleteBookingAsync(int id)
            // {
            //       using var transaction = _context.Database.BeginTransactionAsync();
            //       try
            //       {
            //             await _context.SaveChangesAsync();
            //             await transaction.CommitAsync();
            //       }
            //       catch (Exception e)
            //       {
            //             await transaction.RollbackAsync();
            //             throw;
            //       }
            // }


            public async Task<BookingModel> GetBookingByIdAsync(object id)
            {
                  return await _context.Booking
                              .Include(b => b.BookingDetails)
                                      .ThenInclude(bd => bd!.Room)
                              .Include(b => b.ServiceUsage)
                                    .ThenInclude(su => su.Service)
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
                                    .Include(b => b.ServiceUsage)
                                          .ThenInclude(su => su.Service)
                                    .Include(b => b.Customer)
                                    .Include(b => b.StaffCheckIn)
                                    .Include(b => b.StaffCheckOut)
                                    .Where(b => b.DeletedAt == null)
                                    .ToListAsync();
            }

            public async Task<IEnumerable<BookingModel>> GetBookingsAuthorizedAsync(int id)
            {
                  return await _context.Booking
                                          .Include(b => b.BookingDetails)
                                                .ThenInclude(bd => bd!.Room)
                                          .Include(b => b.ServiceUsage)
                                                .ThenInclude(su => su.Service)
                                          .Include(b => b.Customer)
                                          .Include(b => b.StaffCheckIn)
                                          .Include(b => b.StaffCheckOut)
                                          .Where(b => b.CustomerId == id && b.Status != 0)
                                          .ToListAsync();
            }

            public async Task<IEnumerable<BookingModel>> GetAuthorizedCancelledBookingsAsync(int id)
            {
                  return await _context.Booking
                                   .Include(b => b.BookingDetails)
                                         .ThenInclude(bd => bd!.Room)
                                   .Include(b => b.ServiceUsage)
                                         .ThenInclude(su => su.Service)
                                   .Include(b => b.Customer)
                                   .Include(b => b.StaffCheckIn)
                                   .Include(b => b.StaffCheckOut)
                                   .Where(b => b.Status == 0 && b.CustomerId == id)
                                   .ToListAsync();
            }
      }
}