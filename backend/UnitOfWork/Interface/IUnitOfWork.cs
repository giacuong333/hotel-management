using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;
using Repositories.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    IBookingRepository Bookings { get; }
    IRoomRepository Rooms { get; }
    IGalleryRepository Gallery { get; }
    IServiceRepository Services { get; }
    IServiceUsageRepository ServicesUsage { get; }
    IReviewRepository Reviews { get; }
    IReceiptRepository Receipts { get; }
    IRoleRepository Roles { get; }
    IRolePermissionRepository RolePermissions { get; }
    IDashboardRepository Dashboards { get; }
    IDiscountRepository Discounts { get; }
    IFeedBackRepository FeedBacks { get; }
    IStatisticsRepository Statistics { get; }
    Task<int> CompleteAsync();
    Task<IDbContextTransaction> BeginTransactionAsync();
    Task CommitTransactionAsync();
    Task RollbackTransactionAsync();
}