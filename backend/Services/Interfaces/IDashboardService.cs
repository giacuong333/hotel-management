
using backend.Models;

public interface IDashboardService
{
    Task<IEnumerable<RoomModel>> GetAvailableRoomsAsync();
    Task<IEnumerable<BookingModel>> GetTodayCheckoutsAsync();
    Task<IEnumerable<BookingModel>> GetCancellationsAsync();
    Task<IEnumerable<BookingModel>> GetPendingPaymentsAsync();
    Task<IEnumerable<BookingModel>> GetBookingDetailsAsync();
    Task<IEnumerable<BookingModel>> GetBookingsByMonthAsync(string month);




}