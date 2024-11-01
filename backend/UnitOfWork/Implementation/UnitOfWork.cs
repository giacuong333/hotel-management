using backend.Database;
using backend.Repositories.Interfaces;
using Repositories.Interfaces;

public class UnitOfWork(DatabaseContext dbContext) : IUnitOfWork
{
    private readonly DatabaseContext _dbContext = dbContext;

    public IUserRepository Users { get; }

    public IBookingRepository Bookings { get; }

    public IRoomRepository Rooms { get; }

    public IGalleryRepository Gallery { get; }
    public IReviewRepository Reviews { get; }
    public IRoleRepository Roles { get; }
    public IRolePermissionRepository RolePermissions { get; }
    public IServiceRepository Services { get; }




    public async Task<int> CompleteAsync()
    {
        return await _dbContext.SaveChangesAsync();
    }

    public async void Dispose()
    {
        await _dbContext.DisposeAsync();
    }
}