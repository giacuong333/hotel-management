using backend.Database;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implementations
{
    public class ServiceRepository : GenericRepository<ServiceModel>, IServiceRepository
    {
        public ServiceRepository(DatabaseContext context) : base(context) { }

        public async Task<IEnumerable<ServiceModel>> GetServicesActiveAsync()
        {
            return await _context.Service.Where(sv => sv.DeletedAt == null && sv.Status != 0)
                .ToListAsync();
        }
    }
}