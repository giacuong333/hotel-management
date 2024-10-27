using backend.Models;
using Interfaces;

namespace Repositories.Interfaces
{
      public interface IBookingRepository : IGenericRepository<BookingModel>
      {
            Task<IEnumerable<BookingModel>> GetBookingsAsync();
      }
}