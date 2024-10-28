using backend.Models;
using backend.Repositories.Interfaces;
using Repositories.Interfaces;

public class ServiceService : IServiceService
{
      private readonly IServiceRepository _serviceRepository;
      private readonly IConfiguration _configuration;
      private readonly ILogger<RoomService> _logger;

      public ServiceService(IServiceRepository serviceRepository, IConfiguration configuration, ILogger<RoomService> logger)
      {
        _serviceRepository = serviceRepository;
            _configuration = configuration;
            _logger = logger;
      }

      public async Task CreateServiceAsync(ServiceModel service)
      {
            await _serviceRepository.CreateAsync(service);
            await _serviceRepository.SaveAsync();
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
