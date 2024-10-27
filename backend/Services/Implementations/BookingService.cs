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

      public Task CreateBookingAsync(BookingModel room)
      {
            throw new NotImplementedException();
      }

      public Task CreateRoomAsync(RoomModel room)
      {
            throw new NotImplementedException();
      }

      public Task DeleteBookingAsync(object id)
      {
            throw new NotImplementedException();
      }

      public Task<BookingModel> GetBookingByIdAsync(object id)
      {
            throw new NotImplementedException();
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
