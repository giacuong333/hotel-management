using backend.Models;

public class BookingService(IUnitOfWork unitOfWork) : IBookingService
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task ChangeStatusAsync(BookingModel booking, int status, int staffId)
    {
        await _unitOfWork.Bookings.ChangeBookingStatus(booking, status, staffId);
        await _unitOfWork.CompleteAsync();
    }

    public async Task DeleteBookingAsync(object id)
    {
        await _unitOfWork.Bookings.DeleteAsync(id);
        await _unitOfWork.CompleteAsync();
    }
    public async Task<BookingModel> CheckCustomerCheckedOutAsync(int userId, int roomId)
    {
        return await _unitOfWork.Bookings.CheckCustomerCheckedOutAsync(userId, roomId);
    }

    public async Task<IEnumerable<BookingModel>> GetAuthorizedBookingsAsync(int id)
    {
        return await _unitOfWork.Bookings.GetBookingsAuthorizedAsync(id);
    }

    public async Task<BookingModel> GetBookingByIdAsync(object id)
    {
        return await _unitOfWork.Bookings.GetBookingByIdAsync(id);
    }

    public async Task<IEnumerable<BookingModel>> GetBookingsAsync()
    {
        return await _unitOfWork.Bookings.GetBookingsAsync();
    }

    public async Task<IEnumerable<BookingModel>> GetAuthorizedCancelledBookingsAsync(int id)
    {
        return await _unitOfWork.Bookings.GetAuthorizedCancelledBookingsAsync(id);
    }

    public async Task<IEnumerable<BookingModel>> GetBookingsByRoomIdAsync(int roomId)
    {
        return await _unitOfWork.Bookings.GetBookingsByRoomIdAsync(roomId);
    }

    public async Task CreateBookingAsync(BookingModel booking, ServiceUsageModel[] services, ReceiptModel receipt)
    {
        // Bắt đầu một giao dịch để đảm bảo tính toàn vẹn dữ liệu
        using var transaction = await _unitOfWork.BeginTransactionAsync();

        try
        {
            // Tạo booking và lưu vào database
            await _unitOfWork.Bookings.CreateAsync(booking);
            await _unitOfWork.CompleteAsync();

            // Nếu có danh sách dịch vụ, liên kết chúng với booking
            if (services != null && services.Length > 0)
            {
                foreach (var service in services)
                {
                    // Gắn BookingId vào từng dịch vụ
                    service.BookingId = booking.Id;
                    await _unitOfWork.ServicesUsage.CreateAsync(service);
                }

                // Lưu thay đổi sau khi thêm các dịch vụ
                await _unitOfWork.CompleteAsync();
            }

            receipt.BookingId = booking.Id;
            await _unitOfWork.Receipts.CreateReceiptAsync(receipt);
            await _unitOfWork.CompleteAsync();

            // Xác nhận giao dịch thành công
            await transaction.CommitAsync();
        }
        catch (Exception ex)
        {
            // Rollback nếu có lỗi
            await transaction.RollbackAsync();
            Console.WriteLine($"Error while creating booking: {ex.Message}");
            throw; // Re-throw exception để xử lý bên trên
        }
    }
}