using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implementations
{
      public class BookingRepository : GenericRepository<BookingModel>, IBookingRepository
      {
            public BookingRepository(DatabaseContext context) : base(context) { }

      }
}