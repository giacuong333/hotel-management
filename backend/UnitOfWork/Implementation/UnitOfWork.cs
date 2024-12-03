using backend.Database;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Repositories.Interfaces;

public class UnitOfWork(
    DatabaseContext dbContext,
    IUserRepository users,
    IBookingRepository bookings,
    IRoomRepository rooms,
    IGalleryRepository gallery,
    IReviewRepository reviews,
    IReceiptRepository receipts,
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

    private IDbContextTransaction _transaction;

    public IUserRepository? Users { get; } = users;
    public IBookingRepository? Bookings { get; } = bookings;
    public IRoomRepository? Rooms { get; } = rooms;
    public IGalleryRepository? Gallery { get; } = gallery;
    public IReviewRepository? Reviews { get; } = reviews;
    public IReceiptRepository Receipts { get; } = receipts;
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

    // Bắt đầu giao dịch
    public async Task<IDbContextTransaction> BeginTransactionAsync()
    {
        if (_transaction != null)
        {
            throw new InvalidOperationException("A transaction is already in progress.");
        }

        _transaction = await _dbContext.Database.BeginTransactionAsync();
        return _transaction;
    }

    // Xác nhận giao dịch
    public async Task CommitTransactionAsync()
    {
        if (_transaction == null)
        {
            throw new InvalidOperationException("No transaction in progress.");
        }

        try
        {
            // Xác nhận giao dịch hiện tại
            await _transaction.CommitAsync();
        }
        finally
        {
            // Giải phóng tài nguyên giao dịch
            await DisposeTransactionAsync();
        }
    }

    // Hủy giao dịch
    public async Task RollbackTransactionAsync()
    {
        if (_transaction == null)
        {
            throw new InvalidOperationException("No transaction in progress.");
        }

        try
        {
            await _transaction.RollbackAsync();
        }
        finally
        {
            await DisposeTransactionAsync();
        }
    }

    // Giải phóng giao dịch
    private async Task DisposeTransactionAsync()
    {
        if (_transaction != null)
        {
            await _transaction.DisposeAsync();
            _transaction = null;
        }
    }
}