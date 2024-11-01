using backend.Models;
using backend.Repositories.Interfaces;
using Repositories.Interfaces;

public class ServiceService : IServiceService
{

    private readonly IUnitOfWork _unitOfWork;


    public ServiceService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;

    }

    public async Task CreateServiceAsync(ServiceModel service)
    {
        await _unitOfWork.Services.CreateAsync(service);
        await _unitOfWork.CompleteAsync();

    }

    public async Task DeleteServiceAsync(object id)
    {
        await _unitOfWork.Services.DeleteAsync(id);
        await _unitOfWork.CompleteAsync();
    }

    public async Task<IEnumerable<ServiceModel>> GetServicesActiveAsync()
    {
        return await _unitOfWork.Services.GetServicesActiveAsync();
    }

    public async Task<ServiceModel> GetServiceByIdAsync(object id)
    {
        return await _unitOfWork.Services.GetByIdAsync(id);
    }

    public async Task<IEnumerable<ServiceModel>> GetServicesAsync()
    {
        return await _unitOfWork.Services.GetAllAsync();
    }



    public async Task UpdateServiceAsync(ServiceModel service)
    {
        await _unitOfWork.Services.UpdateAsync(service);
        await _unitOfWork.CompleteAsync();
    }


}
