using backend.Models;

public class BookingService(IUnitOfWork unitOfWork) : IBookingService
{
      private readonly IUnitOfWork _unitOfWork = unitOfWork;

      public async Task ChangeStatusAsync(BookingModel booking, int status, int staffCheckOutId)
      {
            await _unitOfWork.Bookings.ChangeBookingStatus(booking, status, staffCheckOutId);
            await _unitOfWork.CompleteAsync();
      }

      public async Task DeleteBookingAsync(object id)
      {
            await _unitOfWork.Bookings.DeleteAsync(id);
            await _unitOfWork.CompleteAsync();
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
}