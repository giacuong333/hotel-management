using backend.Models;
using Interfaces;

namespace backend.Repositories.Interfaces
{
    public interface IServiceUsageRepository : IGenericRepository<ServiceUsageModel>
    {
        Task<IEnumerable<ServiceUsageModel>> GetServicesUsedAsync(int bookingId, int userId);
    }
}
