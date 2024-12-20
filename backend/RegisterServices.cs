using backend.Models;
using backend.Repositories.Implementations;
using backend.Repositories.Interfaces;
using backend.Services.Implementations;
using backend.Services.Interfaces;
using Interfaces;
using Repositories.Implementations;
using Repositories.Interfaces;
using Services.Interfaces;

class RegisterServices
{
    public static void Register(WebApplicationBuilder builder)
    {
        // Register Repositories
        builder.Services.AddScoped<IGenericRepository<UserModel>, GenericRepository<UserModel>>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
        builder.Services.AddScoped<IGenericRepository<RoleModel>, GenericRepository<RoleModel>>();
        builder.Services.AddScoped<IRoleRepository, RoleRepository>();
        builder.Services.AddScoped<IGenericRepository<RoomModel>, GenericRepository<RoomModel>>();
        builder.Services.AddScoped<IRoomRepository, RoomRepository>();
        builder.Services.AddScoped<IGenericRepository<BookingModel>, GenericRepository<BookingModel>>();
        builder.Services.AddScoped<IBookingRepository, BookingRepository>();
        builder.Services.AddScoped<IGenericRepository<GalleryModel>, GenericRepository<GalleryModel>>();
        builder.Services.AddScoped<IGalleryRepository, GalleryRepository>();
        builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
        builder.Services.AddScoped<IReviewRepository, ReviewRepository>();
        builder.Services.AddScoped<IRolePermissionRepository, RolePermissionRepository>();
        builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();
        builder.Services.AddScoped<IServiceUsageRepository, ServiceUsageRepository>();
        builder.Services.AddScoped<IReceiptRepository, ReceiptRepository>();
        builder.Services.AddScoped<IGenericRepository<DiscountModel>, GenericRepository<DiscountModel>>();
        builder.Services.AddScoped<IDiscountRepository, DiscountRepository>();
        builder.Services.AddScoped<IFeedBackRepository, FeedBackRepository>();
        builder.Services.AddScoped<IStatisticsRepository, StatisticsRepository>();
        builder.Services.AddScoped<IGenericRepository<LockRoomModel>, GenericRepository<LockRoomModel>>();
        builder.Services.AddScoped<ILockRoomRepository, LockRoomRepository>();

        // Register Services
        builder.Services.AddScoped<IAuthService, AuthService>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IRoleService, RoleService>();
        builder.Services.AddScoped<IRoomService, RoomService>();
        builder.Services.AddScoped<IBookingService, BookingService>();
        builder.Services.AddScoped<IGalleryService, GalleryService>();
        builder.Services.AddScoped<IServiceService, ServiceService>();
        builder.Services.AddScoped<IReviewService, ReviewService>();
        builder.Services.AddScoped<IRoleService, RoleService>();
        builder.Services.AddScoped<IRolePermissionService, RolePermissionService>();
        builder.Services.AddScoped<IDashboardService, DashboardService>();
        builder.Services.AddScoped<IServiceUsageService, ServiceUsageService>();
        builder.Services.AddScoped<IReceiptService, ReceiptService>();
        builder.Services.AddScoped<IDiscountService, DiscountService>();
        builder.Services.AddScoped<IFeedBackService, FeedBackService>();
        builder.Services.AddScoped<IStatisticsService, StatisticsService>();
        builder.Services.AddScoped<ILockRoomService, LockRoomService>();

        builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
    }
}