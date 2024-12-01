using backend.Models;
using Interfaces;

namespace backend.Repositories.Interfaces
{
    public interface IStatisticsRepository
    {
        Task<IEnumerable<BookingModel>> GetBookingCanelsAsync(DateTime start,DateTime end);
        Task<IEnumerable<BookingModel>> GetBookingSuccesssAsync(DateTime start, DateTime end);
      
        Task<IEnumerable<ReceiptModel>> GetRevenueByDateTimeAsync(DateTime start,DateTime end);

        Task<IEnumerable<UserModel>> GetCustomersAsync(DateTime start, DateTime end);

        Task<IEnumerable<BookingModel>> GetCustomerBookingRetrysAsync(DateTime start, DateTime end);










    }
}
