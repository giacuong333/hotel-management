

public class ServiceUsageService(IUnitOfWork unitOfWork) : IServiceUsageService
{

    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<IEnumerable<ServiceUsageModel>> GetServicesUsedAsync(int bookingId, int userId)
    {
        return await _unitOfWork.ServicesUsage.GetServicesUsedAsync(bookingId, userId);
    }
}
