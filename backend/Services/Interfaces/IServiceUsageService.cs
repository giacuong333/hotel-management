

public interface IServiceUsageService
{
    Task<IEnumerable<ServiceUsageModel>> GetServicesUsedAsync(int bookingId, int userId);
}