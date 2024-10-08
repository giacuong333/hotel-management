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

        public DbSet<RoomModel> Room { get; set; }

        public DbSet<BookingModel> Booking { get; set; }

        public DbSet<DiscountModel> Discount { get; set; }

        public DbSet<FeedBackModel> Feedback { get; set; }

        public DbSet<GalleryModel> Gallery { get; set; }

        // public DbSet<UserModel> Receipt { get; set; }

        public DbSet<PermissionModel> Permission { get; set; }

<<<<<<< HEAD
            public DbSet<ReviewModel> Review { get; set; }
=======
        public DbSet<ReviewModel> Review { get; set; }
>>>>>>> 7b7c63b486f058fd906f5a62ff841bc3632391ee

        public DbSet<RolepermissionModel> Rolepermission { get; set; }

<<<<<<< HEAD
            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                  modelBuilder.Entity<UserModel>()
                  .HasOne(u => u.Roles)
                  .WithMany()
                  .HasForeignKey(u => u.RoleId);

                  modelBuilder.Entity<ReviewModel>()
                  .HasOne(u => u.Users)
                  .WithMany()
                  .HasForeignKey(u => u.UserId);
=======
         public DbSet<ServiceModel> Service { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>()
            .HasOne(u => u.Roles)
            .WithMany()
            .HasForeignKey(u => u.RoleId);

            modelBuilder.Entity<ReviewModel>()
             .HasOne(r => r.Users)
             .WithMany()
             .HasForeignKey(r => r.UserId);


            modelBuilder.Entity<ReviewModel>()
             .HasOne(u => u.Rooms)
             .WithMany()
             .HasForeignKey(u => u.RoomId);


       
>>>>>>> 7b7c63b486f058fd906f5a62ff841bc3632391ee

                  modelBuilder.Entity<ReviewModel>()
                  .HasOne(u => u.Rooms)
                  .WithMany()
                  .HasForeignKey(u => u.RoomId);

<<<<<<< HEAD
                  // modelBuilder.Entity<BookingModel>()
                  // .HasOne(r => r.Room);
                  // modelBuilder.Entity<BookingModel>()
                  // .HasOne(u => u.Staff);
                  // modelBuilder.Entity<BookingModel>()
                  // .HasOne(u => u.Customer);
            }
      }
=======
            // modelBuilder.Entity<BookingModel>()
            // .HasOne(r => r.Room);
            // modelBuilder.Entity<BookingModel>()
            // .HasOne(u => u.Staff);
            // modelBuilder.Entity<BookingModel>()
            // .HasOne(u => u.Customer);
        }
    }
>>>>>>> 7b7c63b486f058fd906f5a62ff841bc3632391ee
}