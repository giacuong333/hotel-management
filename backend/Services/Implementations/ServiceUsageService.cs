

public class ServiceUsageService(IUnitOfWork unitOfWork) : IServiceUsageService
{

    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task CreateServiceForCustomerAsync(int bookingId, int serviceId, int quantity)
    {
        await _unitOfWork.ServicesUsage.CreateServiceForCustomerAsync(bookingId, serviceId, quantity);
        await _unitOfWork.CompleteAsync();
    }

    public async Task DeleteServiceUsageAsync(List<int> ids)
    {
        await _unitOfWork.ServicesUsage.DeleteServiceUsageAsync(ids);
        await _unitOfWork.CompleteAsync();
    }

    public async Task<IEnumerable<ServiceUsageModel>> GetServicesUsedAsync(int bookingId, int userId)
    {
        return await _unitOfWork.ServicesUsage.GetServicesUsedAsync(bookingId, userId);
    }
}
