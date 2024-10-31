using Repositories.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    IBookingRepository Bookings { get; }
    IRoomRepository Rooms { get; }
    IGalleryRepository Gallery { get; }
    Task<int> CompleteAsync();
}