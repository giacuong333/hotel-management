using backend.Models;
using Repositories.Interfaces;

public class BookingService : IBookingService
{
      private readonly IBookingRepository _bookingRepository;
      private readonly IConfiguration _configuration;
      private readonly ILogger<BookingService> _logger;

      public BookingService(IBookingRepository bookingRepository, IConfiguration configuration, ILogger<BookingService> logger)
      {
            _bookingRepository = bookingRepository;
            _configuration = configuration;
            _logger = logger;
      }

      public async Task ChangeStatusAsync(BookingModel booking, int status)
      {
            await _bookingRepository.ChangeBookingStatus(booking, status);
      }

      public Task CreateBookingAsync(BookingModel room)
      {
            throw new NotImplementedException();
      }

      public Task CreateRoomAsync(RoomModel room)
      {
            throw new NotImplementedException();
      }

      public async Task DeleteBookingAsync(object id)
      {
            await _bookingRepository.DeleteAsync(id);
      }

      public async Task<BookingModel> GetBookingByIdAsync(object id)
      {
            return await _bookingRepository.GetBookingByIdAsync(id);
      }

      public async Task<IEnumerable<BookingModel>> GetBookingsAsync()
      {
            return await _bookingRepository.GetBookingsAsync();
      }

      public async Task SaveAsync()
      {
            await _bookingRepository.SaveAsync();
      }
}
