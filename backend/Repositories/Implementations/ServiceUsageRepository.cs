using backend.Database;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Repositories.Implementations
{
    public class ServiceUsageRepository : GenericRepository<ServiceUsageModel>, IServiceUsageRepository
    {
        public ServiceUsageRepository(DatabaseContext context) : base(context) { }

        public async Task CreateServiceForCustomerAsync(int bookingId, int serviceId, int quantity)
        {
            var serviceUsageFromDatabase = await _context.ServiceUsage.FirstOrDefaultAsync(su => su.BookingId == bookingId && su.ServiceId == serviceId);
            if (serviceUsageFromDatabase != null)
            {
                serviceUsageFromDatabase.Quantity += quantity;
                _context.ServiceUsage.Update(serviceUsageFromDatabase);
            }
            else
            {
                var serviceUsage = new ServiceUsageModel { BookingId = bookingId, ServiceId = serviceId, Quantity = 1 };
                await CreateAsync(serviceUsage);
            }
        }

        public async Task DeleteServiceUsageAsync(List<int> ids)
        {
            foreach (var id in ids)
            {
                var serviceUsage = await GetByIdAsync(id);
                if (serviceUsage != null)
                    await DeleteAsync(serviceUsage.Id);
            }
        }

        public async Task<IEnumerable<ServiceUsageModel>> GetServicesUsedAsync(int bookingId, int userId)
        {
            return await _context.ServiceUsage
                        .Include(su => su.Service)
                        .Include(su => su.Booking)
                        .Where(su => su.BookingId == bookingId && su.Booking!.CustomerId == userId)
                        .ToListAsync();
        }

        public async Task<IEnumerable<ServiceUsageModel>> GetServicesUsedAsync(int bookingId)
        {
            // return await _context.Service
            //         .Select(su => new {
            //             Service = new {
            //                 su.
            //             }
            //         })
            return null;
        }
    }
}