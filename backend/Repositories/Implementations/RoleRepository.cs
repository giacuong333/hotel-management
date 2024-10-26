using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implementations
{
      public class RoleRepository : GenericRepository<RoleModel>, IRoleRepository
      {
            public RoleRepository(DatabaseContext context) : base(context) { }
      }
}