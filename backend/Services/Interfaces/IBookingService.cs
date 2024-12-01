
using backend.Models;

public interface IBookingService
{
<<<<<<< HEAD
      Task<IEnumerable<BookingModel>> GetBookingsAsync();
      Task<IEnumerable<BookingModel>> GetAuthorizedCancelledBookingsAsync(int id);
      Task<IEnumerable<BookingModel>> GetAuthorizedBookingsAsync(int id);
      Task<BookingModel> GetBookingByIdAsync(object id);
      Task DeleteBookingAsync(object id);
      Task ChangeStatusAsync(BookingModel booking, int status, int staffCheckOutId);
      Task<BookingModel> CheckCustomerCheckedOutAsync(int userId, int roomId);
      Task<IEnumerable<BookingModel>> GetBookingsByRoomIdAsync(int roomId);
      Task SaveAsync();
=======
    Task<IEnumerable<BookingModel>> GetBookingsAsync();
    Task<IEnumerable<BookingModel>> GetAuthorizedCancelledBookingsAsync(int id);
    Task<IEnumerable<BookingModel>> GetAuthorizedBookingsAsync(int id);
    Task<BookingModel> GetBookingByIdAsync(object id);
    Task DeleteBookingAsync(object id);
    Task ChangeStatusAsync(BookingModel booking, int status, int staffCheckOutId);
    Task<BookingModel> CheckCustomerCheckedOutAsync(int userId, int roomId);
    Task<IEnumerable<BookingModel>> GetBookingsByRoomIdAsync(int roomId);
    Task CreateBookingAsync(BookingModel booking, ServiceUsageModel[] services, ReceiptModel receipt);
>>>>>>> 6a95901db4df8ca164e3d9e7e643827f49d801d7
}