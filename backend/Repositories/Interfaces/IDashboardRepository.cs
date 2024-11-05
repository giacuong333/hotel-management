using backend.Models;
using Interfaces;

namespace backend.Repositories.Interfaces
{
    public interface IDashboardRepository
    {
        Task<IEnumerable<RoomModel>> GetAvailableRoomsAsync();
        Task<IEnumerable<BookingModel>> GetTodayCheckoutsAsync();
        Task<IEnumerable<BookingModel>> GetCancellationsAsync();
        Task<IEnumerable<BookingModel>> GetPendingPaymentsAsync();
        Task<IEnumerable<BookingModel>> GetBookingDetailsAsync();







    }
}
