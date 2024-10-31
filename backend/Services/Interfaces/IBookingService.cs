
using backend.Models;

public interface IBookingService
{
      Task<IEnumerable<BookingModel>> GetBookingsAsync();
      Task<IEnumerable<BookingModel>> GetBookedDatesAsync();
      Task<BookingModel> GetBookingByIdAsync(object id);
      Task DeleteBookingAsync(object id);
      Task ChangeStatusAsync(BookingModel booking, int status);
      Task<int> SaveAsync();
}