
using backend.Models;

public interface IBookingService
{
      Task<IEnumerable<BookingModel>> GetBookingsAsync();
      Task<BookingModel> GetBookingByIdAsync(object id);
      Task CreateBookingAsync(BookingModel room);
      Task DeleteBookingAsync(object id);
      Task ChangeStatusAsync(BookingModel booking, int status);
      Task SaveAsync();
}