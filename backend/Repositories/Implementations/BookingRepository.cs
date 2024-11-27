using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implementations
{
      public class BookingRepository : GenericRepository<BookingModel>, IBookingRepository
      {
            public BookingRepository(DatabaseContext context) : base(context) { }

            public async Task ChangeBookingStatus(BookingModel booking, int status, int staffId)
            {
                  var transaction = await _context.Database.BeginTransactionAsync();
                  try
                  {
                        var bookingFromDatabase = await _context.Booking.FindAsync(booking.Id);
                        if (bookingFromDatabase != null)
                        {
                              bookingFromDatabase.Status = status;
                              _context.Booking.Update(bookingFromDatabase);
                        }

                        var room = await _context.Room.FindAsync(booking.RoomId);
                        if (room != null)
                        {
                              switch (status)
                              {
                                    case 1: // Confirmed
                                          room.Status = 2; // Booked
                                          break;
                                    case 2: // Check-in
                                          room.Status = 3; // Staying
                                          bookingFromDatabase!.StaffCheckInId = staffId;
                                          break;
                                    case 3: // Check-out
                                          room.Status = 1; // Empty
                                          bookingFromDatabase!.StaffCheckOutId = staffId;
                                          break;
                                    case 0:
                                          room.Status = 1; // Empty
                                          break;
                                    default:
                                          break;
                              }
                              _context.Room.Update(room);
                        }


                        await transaction.CommitAsync();
                  }
                  catch
                  {
                        await transaction.RollbackAsync();
                        throw;
                  }
            }
        public async Task<BookingModel> CheckCustomerCheckedOutAsync(int userId, int roomId)
        {
            return await _context.Booking
                .Where(bk => bk.CustomerId == userId && bk.RoomId == roomId && bk.Status == 3)
                .FirstOrDefaultAsync();
        }
        public async Task<BookingModel?> GetBookingByIdAsync(object id)
            {
                  // Validate and convert id parameter
                  if (id == null || !int.TryParse(id.ToString(), out int bookingId))
                  {
                        throw new ArgumentException("Invalid booking ID format", nameof(id));
                  }

                  return await _context.Booking
                      .Where(b => b.DeletedAt == null && b.Id == bookingId)
                      .Select(b => new BookingModel
                      {
                            Id = b.Id,
                            CustomerName = b.CustomerName,
                            CustomerEmail = b.CustomerEmail,
                            CustomerPhoneNumber = b.CustomerPhoneNumber,
                            CheckIn = b.CheckIn,
                            CheckOut = b.CheckOut,
                            StaffCheckInId = b.StaffCheckInId,
                            StaffCheckOutId = b.StaffCheckOutId,
                            Status = b.Status,
                            CustomerId = b.CustomerId,
                            RoomId = b.RoomId,
                            CreatedAt = b.CreatedAt,
                            UpdatedAt = b.UpdatedAt,
                            DeletedAt = b.DeletedAt,
                            StaffCheckIn = b.StaffCheckIn != null ? new UserModel
                            {
                                  Id = b.StaffCheckIn.Id,
                                  Name = b.StaffCheckIn.Name,
                                  Email = b.StaffCheckIn.Email,
                                  PhoneNumber = b.StaffCheckIn.PhoneNumber,
                                  Avatar = b.StaffCheckIn.Avatar,
                                  Gender = b.StaffCheckIn.Gender,
                                  RoleId = b.StaffCheckIn.RoleId,
                                  FirstBook = b.StaffCheckIn.FirstBook,
                                  Dob = b.StaffCheckIn.Dob,
                                  CreatedAt = b.StaffCheckIn.CreatedAt,
                                  UpdatedAt = b.StaffCheckIn.UpdatedAt,
                                  DeletedAt = b.StaffCheckIn.DeletedAt,
                            } : null,
                            StaffCheckOut = b.StaffCheckOut != null ? new UserModel
                            {
                                  Id = b.StaffCheckOut.Id,
                                  Name = b.StaffCheckOut.Name,
                                  Email = b.StaffCheckOut.Email,
                                  PhoneNumber = b.StaffCheckOut.PhoneNumber,
                                  Avatar = b.StaffCheckOut.Avatar,
                                  Gender = b.StaffCheckOut.Gender,
                                  RoleId = b.StaffCheckOut.RoleId,
                                  FirstBook = b.StaffCheckOut.FirstBook,
                                  Dob = b.StaffCheckOut.Dob,
                                  CreatedAt = b.StaffCheckOut.CreatedAt,
                                  UpdatedAt = b.StaffCheckOut.UpdatedAt,
                                  DeletedAt = b.StaffCheckOut.DeletedAt,
                            } : null,
                            Customer = b.Customer != null ? new UserModel
                            {
                                  Id = b.Customer.Id,
                                  Name = b.Customer.Name,
                                  Email = b.Customer.Email,
                                  PhoneNumber = b.Customer.PhoneNumber,
                                  Avatar = b.Customer.Avatar,
                                  Gender = b.Customer.Gender,
                                  RoleId = b.Customer.RoleId,
                                  FirstBook = b.Customer.FirstBook,
                                  Dob = b.Customer.Dob,
                                  CreatedAt = b.Customer.CreatedAt,
                                  UpdatedAt = b.Customer.UpdatedAt,
                                  DeletedAt = b.Customer.DeletedAt,
                            } : null,
                            Room = b.Room != null ? new RoomModel
                            {
                                  Id = b.Room.Id,
                                  Thumbnail = b.Room.Thumbnail,
                                  Name = b.Room.Name,
                                  Type = b.Room.Type,
                                  Description = b.Room.Description,
                                  BedNum = b.Room.BedNum,
                                  Status = b.Room.Status,
                                  Price = b.Room.Price,
                                  Area = b.Room.Area,
                            } : null,
                            ServiceUsage = b.ServiceUsage != null ? b.ServiceUsage.Select(su => new ServiceUsageModel
                            {
                                  Id = su.Id,
                                  BookingId = su.BookingId,
                                  ServiceId = su.ServiceId,
                                  Quantity = su.Quantity,
                                  Service = su.Service != null ? new ServiceModel
                                  {
                                        Id = su.Service.Id,
                                        Name = su.Service.Name,
                                        Price = su.Service.Price,
                                        Status = su.Service.Status,
                                        DeletedAt = su.Service.DeletedAt,
                                        UpdatedAt = su.Service.UpdatedAt,
                                        CreatedAt = su.Service.CreatedAt,
                                  } : null
                            }).ToList() : new List<ServiceUsageModel>()
                      })
                      .FirstOrDefaultAsync(); // No need to check DeletedAt again
            }

            public async Task<IEnumerable<BookingModel>> GetBookingsAsync()
            {
                  return await _context.Booking
                        .Where(b => b.DeletedAt == null)
                      .Select(b => new BookingModel
                      {
                            Id = b.Id,
                            CustomerName = b.CustomerName,
                            CustomerEmail = b.CustomerEmail,
                            CustomerPhoneNumber = b.CustomerPhoneNumber,
                            StaffCheckInId = b.StaffCheckInId,
                            StaffCheckOutId = b.StaffCheckOutId,
                            Status = b.Status,
                            CustomerId = b.CustomerId,
                            RoomId = b.RoomId,
                            CreatedAt = b.CreatedAt,
                            UpdatedAt = b.UpdatedAt,
                            DeletedAt = b.DeletedAt,
                            // Handle potentially null StaffCheckIn
                            StaffCheckIn = b.StaffCheckIn != null ? new UserModel
                            {
                                  Id = b.StaffCheckIn.Id,
                                  Name = b.StaffCheckIn.Name,
                                  Email = b.StaffCheckIn.Email,
                                  PhoneNumber = b.StaffCheckIn.PhoneNumber,
                                  Avatar = b.StaffCheckIn.Avatar,
                                  Gender = b.StaffCheckIn.Gender,
                                  RoleId = b.StaffCheckIn.RoleId,
                                  FirstBook = b.StaffCheckIn.FirstBook,
                                  Dob = b.StaffCheckIn.Dob,
                                  CreatedAt = b.StaffCheckIn.CreatedAt,
                                  UpdatedAt = b.StaffCheckIn.UpdatedAt,
                                  DeletedAt = b.StaffCheckIn.DeletedAt,
                            } : null,
                            // Handle potentially null StaffCheckOut
                            StaffCheckOut = b.StaffCheckOut != null ? new UserModel
                            {
                                  Id = b.StaffCheckOut.Id,
                                  Name = b.StaffCheckOut.Name,
                                  Email = b.StaffCheckOut.Email,
                                  PhoneNumber = b.StaffCheckOut.PhoneNumber,
                                  Avatar = b.StaffCheckOut.Avatar,
                                  Gender = b.StaffCheckOut.Gender,
                                  RoleId = b.StaffCheckOut.RoleId,
                                  FirstBook = b.StaffCheckOut.FirstBook,
                                  Dob = b.StaffCheckOut.Dob,
                                  CreatedAt = b.StaffCheckOut.CreatedAt,
                                  UpdatedAt = b.StaffCheckOut.UpdatedAt,
                                  DeletedAt = b.StaffCheckOut.DeletedAt,
                            } : null,
                            // Handle potentially null Customer
                            Customer = b.Customer != null ? new UserModel
                            {
                                  Id = b.Customer.Id,
                                  Name = b.Customer.Name,
                                  Email = b.Customer.Email,
                                  PhoneNumber = b.Customer.PhoneNumber,
                                  Avatar = b.Customer.Avatar,
                                  Gender = b.Customer.Gender,
                                  RoleId = b.Customer.RoleId,
                                  FirstBook = b.Customer.FirstBook,
                                  Dob = b.Customer.Dob,
                                  CreatedAt = b.Customer.CreatedAt,
                                  UpdatedAt = b.Customer.UpdatedAt,
                                  DeletedAt = b.Customer.DeletedAt,
                            } : null,
                            // Handle potentially null Room
                            Room = b.Room != null ? new RoomModel
                            {
                                  Id = b.Room.Id,
                                  Thumbnail = b.Room.Thumbnail,
                                  Name = b.Room.Name,
                                  Type = b.Room.Type,
                                  Description = b.Room.Description,
                                  BedNum = b.Room.BedNum,
                                  Status = b.Room.Status,
                                  Price = b.Room.Price,
                                  Area = b.Room.Area,
                            } : null,
                            // Handle potentially null ServiceUsage
                            ServiceUsage = b.ServiceUsage != null ? b.ServiceUsage.Select(su => new ServiceUsageModel
                            {
                                  Id = su.Id,
                                  BookingId = su.BookingId,
                                  ServiceId = su.ServiceId,
                                  Quantity = su.Quantity,
                                  Service = su.Service != null ? new ServiceModel
                                  {
                                        Id = su.Service.Id,
                                        Name = su.Service.Name,
                                        Price = su.Service.Price,
                                        Status = su.Service.Status,
                                        DeletedAt = su.Service.DeletedAt,
                                        UpdatedAt = su.Service.UpdatedAt,
                                        CreatedAt = su.Service.CreatedAt,
                                  } : null
                            }).ToList() : new List<ServiceUsageModel>()
                      })
                      .ToListAsync();
            }

            public async Task<IEnumerable<BookingModel>> GetBookingsAuthorizedAsync(int id)
            {
                  return await _context.Booking
                                          .Where(b => b.CustomerId == id && b.Status != 0)
                                          .Include(b => b!.Room)
                                          .Include(b => b.ServiceUsage)
                                                .ThenInclude(su => su.Service)
                                          .Include(b => b.Customer)
                                          .Include(b => b.StaffCheckIn)
                                          .Include(b => b.StaffCheckOut)
                                          .ToListAsync();
            }

            public async Task<IEnumerable<BookingModel>> GetAuthorizedCancelledBookingsAsync(int id)
            {
                  return await _context.Booking
                                   .Where(b => b.Status == 0 && b.CustomerId == id)
                                    .Include(b => b!.Room)
                                   .Include(b => b.ServiceUsage)
                                         .ThenInclude(su => su.Service)
                                   .Include(b => b.Customer)
                                   .Include(b => b.StaffCheckIn)
                                   .Include(b => b.StaffCheckOut)
                                   .ToListAsync();
            }

        public async Task<IEnumerable<BookingModel>> GetBookingsByRoomIdAsync(int roomId)
        {
            return await _context.Booking
                .Where(b => b.RoomId == roomId && b.DeletedAt == null)  
                .ToListAsync();  
        }
    }
}