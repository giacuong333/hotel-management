
using backend.Models;

public interface IBookingService
{
      Task<IEnumerable<BookingModel>> GetBookingsAsync();
      Task<IEnumerable<BookingModel>> GetAuthorizedCancelledBookingsAsync(int id);
      Task<IEnumerable<BookingModel>> GetAuthorizedBookingsAsync(int id);
      Task<BookingModel> GetBookingByIdAsync(object id);
      Task DeleteBookingAsync(object id);
      Task ChangeStatusAsync(BookingModel booking, int status);
      Task<int> SaveAsync();
}