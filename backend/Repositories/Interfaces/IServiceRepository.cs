using backend.Models;
using Interfaces;

namespace backend.Repositories.Interfaces
{
    public interface IServiceRepository : IGenericRepository<ServiceModel>
    {
        Task <IEnumerable<ServiceModel>> GetServicesActiveAsync();
    }
}
