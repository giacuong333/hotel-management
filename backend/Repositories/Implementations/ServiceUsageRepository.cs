using backend.Database;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Repositories.Implementations
{
    public class ServiceUsageRepository : GenericRepository<ServiceUsageModel>, IServiceUsageRepository
    {
        public ServiceUsageRepository(DatabaseContext context) : base(context) { }

        public async Task<IEnumerable<ServiceUsageModel>> GetServicesUsedAsync(int bookingId, int userId)
        {
            return await _context.ServiceUsage
                        .Include(su => su.Service)
                        .Include(su => su.Booking)
                        .Where(su => su.BookingId == bookingId && su.Booking!.CustomerId == userId)
                        .ToListAsync();
        }
    }
}