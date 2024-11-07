using backend.Models;
using backend.Repositories.Interfaces;
using Repositories.Interfaces;

public class DashboardService : IDashboardService
{
    private readonly IUnitOfWork _unitOfWork;


    public DashboardService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;

    }




    public async Task<IEnumerable<RoomModel>> GetAvailableRoomsAsync()
    {
        return await _unitOfWork.Dashboards.GetAvailableRoomsAsync();
    }

    public async Task<IEnumerable<BookingModel>> GetBookingDetailsAsync()
    {
        return await _unitOfWork.Dashboards.GetBookingDetailsAsync();
    }
    public async Task<IEnumerable<BookingModel>> GetBookingsByMonthAsync(string month)
    {
        return await _unitOfWork.Dashboards.GetBookingsByMonthAsync(month);
    }
    public async Task<IEnumerable<BookingModel>> GetCancellationsAsync()
    { 
        return await _unitOfWork.Dashboards.GetCancellationsAsync();
    }

    public async Task<IEnumerable<BookingModel>> GetPendingPaymentsAsync()
    {
        return await _unitOfWork.Dashboards.GetPendingPaymentsAsync();
    }

    public async Task<IEnumerable<BookingModel>> GetTodayCheckoutsAsync()
    {
        return await _unitOfWork.Dashboards.GetTodayCheckoutsAsync();
    }
}
