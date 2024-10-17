using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<UserModel> User { get; set; }

        public DbSet<RoleModel> Role { get; set; }

        public DbSet<RoomModel> Room { get; set; }

        public DbSet<BookingModel> Booking { get; set; }

        public DbSet<BookingDetailModel> BookingDetail { get; set; }

        public DbSet<DiscountModel> Discount { get; set; }

        public DbSet<FeedBackModel> Feedback { get; set; }

        public DbSet<GalleryModel> Gallery { get; set; }

        // public DbSet<UserModel> Receipt { get; set; }

        public DbSet<PermissionModel> Permission { get; set; }

        public DbSet<ReviewModel> Review { get; set; }

        public DbSet<RolepermissionModel> Rolepermission { get; set; }

        public DbSet<ServiceModel> Service { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserModel>()
                .HasOne(u => u.Roles)
                .WithMany()
                .HasForeignKey(u => u.RoleId);

            modelBuilder.Entity<ReviewModel>()
                .HasOne(u => u.Users)
                .WithMany()
                .HasForeignKey(u => u.UserId);
            modelBuilder.Entity<ReviewModel>()
          .HasOne(u => u.Rooms)
          .WithMany()
          .HasForeignKey(u => u.RoomId);

            modelBuilder.Entity<BookingModel>()
                .HasMany(b => b.BookingDetails)
                .WithOne()
                .HasForeignKey(bd => bd.BookingId);

            modelBuilder.Entity<BookingModel>()
                .HasOne(b => b.Customer)
                .WithMany()
                .HasForeignKey(c => c.CustomerId);

            modelBuilder.Entity<BookingModel>()
                .HasOne(b => b.StaffCheckIn)
                .WithMany()
                .HasForeignKey(sci => sci.StaffCheckInId);

            modelBuilder.Entity<BookingModel>()
                .HasOne(b => b.StaffCheckOut)
                .WithMany()
                .HasForeignKey(sco => sco.StaffCheckOutId);

            modelBuilder.Entity<BookingDetailModel>()
                .HasOne(bd => bd.Room)
                .WithMany()
                .HasForeignKey(bd => bd.RoomId);

        }
    }
}