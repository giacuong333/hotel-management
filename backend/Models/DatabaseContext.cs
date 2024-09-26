using backend.Models;
using Microsoft.EntityFrameworkCore; // ORM

namespace backend.Database
{
      public class DatabaseContext : DbContext
      {
            public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
            {
            }

            // Refer to the `user` table in MySQL
            public DbSet<UserModel> User { get; set; }

            public DbSet<RoleModel> Role { get; set; }

            // public DbSet<RoomModel> Room { get; set; }

            // public DbSet<BookingModel> Booking { get; set; }

            // public DbSet<UserModel> Discount { get; set; }

            // public DbSet<UserModel> Feedback { get; set; }

            // public DbSet<UserModel> Gallery { get; set; }

            // public DbSet<UserModel> Receipt { get; set; }

            // public DbSet<UserModel> Permission { get; set; }

            // public DbSet<UserModel> Review { get; set; }

            // public DbSet<UserModel> Service { get; set; }

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                  modelBuilder.Entity<UserModel>()
                  .HasOne(u => u.Roles)
                  .WithMany()
                  .HasForeignKey(u => u.RoleId);


                  // modelBuilder.Entity<BookingModel>()
                  // .HasOne(r => r.Room);
                  // modelBuilder.Entity<BookingModel>()
                  // .HasOne(u => u.Staff);
                  // modelBuilder.Entity<BookingModel>()
                  // .HasOne(u => u.Customer);
            }
      }
}