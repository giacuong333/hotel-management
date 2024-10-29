using backend.Models;
using Interfaces;

namespace Repositories.Interfaces
{
      public interface IBookingRepository : IGenericRepository<BookingModel>
      {
            Task<IEnumerable<BookingModel>> GetBookingsAsync();
            Task<IEnumerable<BookingModel>> GetBookedDatesAsync();
            Task<BookingModel> GetBookingByIdAsync(object id);
            Task ChangeBookingStatus(BookingModel booking, int status);
            Task CreateBookingAsync(BookingModel booking);
      }
}