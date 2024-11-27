using backend.Models;
using Interfaces;

namespace Repositories.Interfaces
{
      public interface IBookingRepository : IGenericRepository<BookingModel>
      {
            Task<IEnumerable<BookingModel>> GetBookingsAsync();
            Task<IEnumerable<BookingModel>> GetAuthorizedCancelledBookingsAsync(int id);
            Task<IEnumerable<BookingModel>> GetBookingsAuthorizedAsync(int id);
            Task<BookingModel?> GetBookingByIdAsync(object id);
            Task ChangeBookingStatus(BookingModel booking, int status, int staffId);
            Task<BookingModel> CheckCustomerCheckedOutAsync(int userId, int roomId);
            Task<IEnumerable<BookingModel>> GetBookingsByRoomIdAsync(int roomId);
    }
}