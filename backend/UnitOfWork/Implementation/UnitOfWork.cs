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
    IReceiptRepository receipts,
    IAdditionalFeeRepository additionalFees,
    IRoleRepository roles,
    IRolePermissionRepository rolePermissions,
    IServiceRepository services,
    IServiceUsageRepository servicesUsage,
    IDashboardRepository dashboards,
    IDiscountRepository discounts,
    IFeedBackRepository feedbacks,
    IStatisticsRepository statistics
    ) : IUnitOfWork
{
    private readonly DatabaseContext _dbContext = dbContext;


    public IUserRepository? Users { get; } = users;
    public IBookingRepository? Bookings { get; } = bookings;
    public IRoomRepository? Rooms { get; } = rooms;
    public IGalleryRepository? Gallery { get; } = gallery;
    public IReviewRepository? Reviews { get; } = reviews;
    public IReceiptRepository Receipts { get; } = receipts;
    public IAdditionalFeeRepository AdditionalFees { get; } = additionalFees;
    public IRoleRepository? Roles { get; } = roles;
    public IRolePermissionRepository? RolePermissions { get; } = rolePermissions;
    public IServiceRepository? Services { get; } = services;
    public IDashboardRepository? Dashboards { get; } = dashboards;
    public IServiceUsageRepository ServicesUsage { get; } = servicesUsage;
    public IDiscountRepository Discounts { get; } = discounts;
    public IFeedBackRepository FeedBacks { get; } = feedbacks;
    public IStatisticsRepository? Statistics { get; } = statistics;

    public async Task<int> CompleteAsync()
    {
        return await _dbContext.SaveChangesAsync();
    }

    public async void Dispose()
    {
        await _dbContext.DisposeAsync();
    }
}