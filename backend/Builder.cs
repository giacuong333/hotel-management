using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using backend.Database;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

class Builder
{
      public static void Build(WebApplicationBuilder builder)
      {
            // JWT Authentication setup
            var key = Encoding.ASCII.GetBytes(builder.Configuration["JwtKey:Key"]);

            builder.Services.AddAuthentication(options =>
            {
                  options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                  options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                  options.RequireHttpsMetadata = false;
                  options.SaveToken = true;
                  options.TokenValidationParameters = new TokenValidationParameters
                  {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ClockSkew = TimeSpan.Zero // Optional: to avoid clock skew issues
                  };
            });

            // Connect MySQL + Migration
            builder.Services.AddDbContext<DatabaseContext>(options =>
                  options.UseMySql(builder.Configuration.GetConnectionString("MySQLConnection"),
                  ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("MySQLConnection"))));

            // Register services
            RegisterServices.Register(builder);

            // CORS
            builder.Services.AddCors(options =>
            {
                  options.AddPolicy("AllowReactApp", builder => builder
                  .WithOrigins("http://localhost:3000") // React app URL
                  .AllowAnyMethod()
                  .AllowAnyHeader());
            });

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            // Allow the JSON serializer to handle cyclic references properly
            builder.Services.AddControllers()
                  .AddJsonOptions(options =>
                  {
                        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
                        // This is optional but useful for proper formatting
                        options.JsonSerializerOptions.WriteIndented = true;
                  });
      }
}

