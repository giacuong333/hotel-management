using backend.Models;
using Interfaces;

namespace Repositories.Interfaces
{
      public interface IRoomRepository : IGenericRepository<RoomModel>
      {
            Task<IEnumerable<RoomModel>> GetEmptyRoomsAsync();
      }
}