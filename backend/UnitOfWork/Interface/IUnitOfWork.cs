using backend.Repositories.Interfaces;
using Repositories.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    IBookingRepository Bookings { get; }
    IRoomRepository Rooms { get; }
    IGalleryRepository Gallery { get; }
    IServiceRepository Services { get; }
    IReviewRepository Reviews { get; }
     IRoleRepository Roles { get; }
    IRolePermissionRepository RolePermissions { get; }
    Task<int> CompleteAsync();
}