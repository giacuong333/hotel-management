using backend.Models;
using Interfaces;

namespace backend.Repositories.Interfaces
{
    public interface IStatisticsRepository
    {
        Task<IEnumerable<ReceiptModel>> GetReceiptsAsync(DateTime start,DateTime end);
        Task<IEnumerable<ReceiptModel>> GetReceiptSuccesssAsync(DateTime start, DateTime end);
      
        Task<IEnumerable<ReceiptModel>> GetRevenueByDateTimeAsync(DateTime start,DateTime end);

        Task<IEnumerable<UserModel>> GetCustomersAsync(DateTime start, DateTime end);

        Task<IEnumerable<BookingModel>> GetCustomerBookingRetrysAsync(DateTime start, DateTime end);










    }
}
