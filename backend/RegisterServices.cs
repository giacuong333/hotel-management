using backend.Models;
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

            // Register Services
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IRoleService, RoleService>();
            builder.Services.AddScoped<IRoomService, RoomService>();
            builder.Services.AddScoped<IBookingService, BookingService>();
      }
}