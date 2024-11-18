using backend.Repositories.Interfaces;
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
    IAdditionalFeeRepository AdditionalFees { get; }
    IRoleRepository Roles { get; }
    IRolePermissionRepository RolePermissions { get; }
    IDashboardRepository Dashboards { get; }

    Task<int> CompleteAsync();
}