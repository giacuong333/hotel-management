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
            var jwtKey = builder.Configuration["JwtKey:Key"];
            var key = Encoding.ASCII.GetBytes(jwtKey);

            builder.Services.AddAuthentication(x =>
            {
                  x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                  x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                  x.RequireHttpsMetadata = false;
                  x.SaveToken = true;
                  x.TokenValidationParameters = new TokenValidationParameters
                  {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ClockSkew = TimeSpan.Zero
                  };
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
                  options.AddPolicy("AllowReactApp", builder => builder
                  .WithOrigins("http://localhost:3000") // React app URL
                  .AllowAnyMethod()
                  .AllowAnyHeader());
            });

            // Allow the JSON serializer to handle cyclic references properly
            builder.Services.AddControllers()
                        .AddJsonOptions(options =>
                        {
                              options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
                        });
      }
}

