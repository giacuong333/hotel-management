using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using backend.Database;

class Builder
{
      public static void Build(WebApplicationBuilder builder)
      {
            // Allow the JSON serializer to handle cyclic references properly
            builder.Services.AddControllers()
                        .AddJsonOptions(options =>
                        {
                              options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
                        });

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            // Connect MySQL
            builder.Services.AddDbContext<DatabaseContext>(options =>
                options.UseMySql(builder.Configuration.GetConnectionString("MySQLConnection"),
                    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("MySQLConnection"))));

            // CORS
            builder.Services.AddCors(options =>
            {
                  options.AddPolicy("AllowReactApp",
    builder => builder
        .WithOrigins("http://localhost:3000") // React app URL
        .AllowAnyMethod()
        .AllowAnyHeader());
            });
      }
}

