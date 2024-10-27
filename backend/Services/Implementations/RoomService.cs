using backend.Models;
using Repositories.Interfaces;

public class RoomService : IRoomService
{
      private readonly IRoomRepository _roomRepository;
      private readonly IConfiguration _configuration;
      private readonly ILogger<RoomService> _logger;

      public RoomService(IRoomRepository roomRepository, IConfiguration configuration, ILogger<RoomService> logger)
      {
            _roomRepository = roomRepository;
            _configuration = configuration;
            _logger = logger;
      }

      public async Task CreateRoomAsync(RoomModel room)
      {
            await _roomRepository.CreateAsync(room);
            await _roomRepository.SaveAsync();
      }

      public async Task DeleteRoomAsync(object id)
      {
            await _roomRepository.DeleteAsync(id);
      }

      public async Task<IEnumerable<RoomModel>> GetEmptyRoomsAsync()
      {
            return await _roomRepository.GetEmptyRoomsAsync();
      }

      public async Task<RoomModel> GetRoomByIdAsync(object id)
      {
            return await _roomRepository.GetByIdAsync(id);
      }

      public async Task<IEnumerable<RoomModel>> GetRoomsAsync()
      {
            return await _roomRepository.GetAllAsync();
      }

      public async Task SaveAsync()
      {
            await _roomRepository.SaveAsync();
      }

      public async Task UpdateRoomAsync(RoomModel user)
      {
            await _roomRepository.UpdateAsync(user);
      }
}
