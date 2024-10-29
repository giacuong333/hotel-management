using backend.Models;
using backend.Repositories.Interfaces;
using Repositories.Interfaces;

public class ServiceService : IServiceService
{
      private readonly IServiceRepository _serviceRepository;
   

      public ServiceService(IServiceRepository serviceRepository)
      {
        _serviceRepository = serviceRepository;
          
      }

      public async Task CreateServiceAsync(ServiceModel service)
      {
            await _serviceRepository.CreateAsync(service);
        
      }

      public async Task DeleteServiceAsync(object id)
      {
            await _serviceRepository.DeleteAsync(id);
      }

      public async Task<IEnumerable<ServiceModel>> GetServicesActiveAsync()
      {
            return await _serviceRepository.GetServicesActiveAsync();
      }

      public async Task<ServiceModel> GetServiceByIdAsync(object id)
      {
            return await _serviceRepository.GetByIdAsync(id);
      }

      public async Task<IEnumerable<ServiceModel>> GetServicesAsync()
      {
            return await _serviceRepository.GetAllAsync();
      }

      public async Task SaveAsync()
      {
            await _serviceRepository.SaveAsync();
      }

      public async Task UpdateServiceAsync(ServiceModel service)
      {
            await _serviceRepository.UpdateAsync(service);
      }


}
