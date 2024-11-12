using backend.Models;
using Interfaces;

namespace Repositories.Interfaces
{
      public interface IBookingRepository : IGenericRepository<BookingModel>
      {
            Task<IEnumerable<BookingModel>> GetBookingsAsync();
            Task<IEnumerable<BookingModel>> GetAuthorizedCancelledBookingsAsync(int id);
            Task<IEnumerable<BookingModel>> GetBookingsAuthorizedAsync(int id);
            Task<BookingModel> GetBookingByIdAsync(object id);
            // Task DeleteBookingAsync(int id);
            Task ChangeBookingStatus(BookingModel booking, int status);
            Task CreateBookingAsync(BookingModel booking);
      }
}