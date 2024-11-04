using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implementations
{
      public class RoomRepository : GenericRepository<RoomModel>, IRoomRepository
      {
            public RoomRepository(DatabaseContext context) : base(context) { }
      }
}