using backend.Database;
using backend.Repositories.Interfaces;
using Repositories.Interfaces;

public class UnitOfWork(
    DatabaseContext dbContext,
    IUserRepository users,
    IBookingRepository bookings,
    IRoomRepository rooms,
    IGalleryRepository gallery,
    IReviewRepository reviews,
    IRoleRepository roles,
    IRolePermissionRepository rolePermissions,
    IServiceRepository services,
    IDashboardRepository dashboards

    ) : IUnitOfWork
{
    private readonly DatabaseContext _dbContext = dbContext;


    public IUserRepository? Users { get; } = users;

    public IBookingRepository? Bookings { get; } = bookings;

    public IRoomRepository? Rooms { get; } = rooms;

    public IGalleryRepository? Gallery { get; } = gallery;
    public IReviewRepository? Reviews { get; } = reviews;
    public IRoleRepository? Roles { get; } = roles;
    public IRolePermissionRepository? RolePermissions { get; } = rolePermissions;
    public IServiceRepository? Services { get; } = services;
    public IDashboardRepository? Dashboards { get; } = dashboards;




    public async Task<int> CompleteAsync()
    {
        return await _dbContext.SaveChangesAsync();
    }

    public async void Dispose()
    {
        await _dbContext.DisposeAsync();
    }
}