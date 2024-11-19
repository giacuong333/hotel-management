

public interface IServiceUsageService
{
    Task<IEnumerable<ServiceUsageModel>> GetServicesUsedAsync(int bookingId, int userId);
    Task CreateServiceForCustomerAsync(int bookingId, int serviceId, int quantity);
    Task DeleteServiceUsageAsync(List<int> ids);
}