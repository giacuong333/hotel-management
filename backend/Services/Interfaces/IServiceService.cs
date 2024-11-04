
using backend.Models;

public interface IServiceService
{
      Task<IEnumerable<ServiceModel>> GetServicesAsync();
      Task<IEnumerable<ServiceModel>> GetServicesActiveAsync();
      Task<ServiceModel> GetServiceByIdAsync(object id);
      Task CreateServiceAsync(ServiceModel service);
      Task UpdateServiceAsync(ServiceModel service);
      Task DeleteServiceAsync(object id);
   
}