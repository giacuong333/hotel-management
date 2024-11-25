using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        // DbSets for your models
        public DbSet<UserModel> User { get; set; }
        public DbSet<RoleModel> Role { get; set; }
        public DbSet<RoomModel> Room { get; set; }
        public DbSet<BookingModel> Booking { get; set; }
        public DbSet<DiscountModel> Discount { get; set; }
        public DbSet<FeedBackModel> Feedback { get; set; }
        public DbSet<GalleryModel> Gallery { get; set; }
        public DbSet<ReceiptModel> Receipt { get; set; }
        public DbSet<PermissionModel> Permission { get; set; }
        public DbSet<ReviewModel> Review { get; set; }
        public DbSet<RolepermissionModel> Rolepermission { get; set; }
        public DbSet<ServiceModel> Service { get; set; }
        public DbSet<ServiceUsageModel> ServiceUsage { get; set; }
        public DbSet<AdditionalFeeModel> AdditionalFee { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User - Role
            modelBuilder.Entity<UserModel>()
                .HasOne(u => u.Roles)
                .WithMany() // Assuming one role can have many users
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);  // Optional: You can change delete behavior

            // Booking - Customer (User)
            modelBuilder.Entity<BookingModel>()
                .HasOne(b => b.Customer)
                .WithMany() // A user (customer) can have many bookings
                .HasForeignKey(b => b.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);

            // Booking - StaffCheckIn
            modelBuilder.Entity<BookingModel>()
                .HasOne(b => b.StaffCheckIn)
                .WithMany() // One user (staff) can check-in many bookings
                .HasForeignKey(b => b.StaffCheckInId)
                .OnDelete(DeleteBehavior.Restrict);

            // Booking - StaffCheckOut
            modelBuilder.Entity<BookingModel>()
                .HasOne(b => b.StaffCheckOut)
                .WithMany() // One user (staff) can check-out many bookings
                .HasForeignKey(b => b.StaffCheckOutId)
                .OnDelete(DeleteBehavior.Restrict);

            // Booking - Room
            modelBuilder.Entity<BookingModel>()
                .HasOne(b => b.Room)
                .WithMany() // One user (staff) can check-out many bookings
                .HasForeignKey(b => b.RoomId)
                .OnDelete(DeleteBehavior.Restrict);

            // Feedback - User
            modelBuilder.Entity<FeedBackModel>()
                .HasOne(f => f.User)  // Assuming FeedBackModel has a navigation property 'User'
                .WithMany()  // A user can have many feedbacks
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Optional: You can change delete behavior

            // Feedback - Room
            modelBuilder.Entity<FeedBackModel>()
                .HasOne(f => f.Room)  // Assuming FeedBackModel has a navigation property 'User'
                .WithMany()  // A user can have many feedbacks
                .HasForeignKey(f => f.RoomId)
                .OnDelete(DeleteBehavior.Restrict); // Optional: You can change delete behavior

            // RolePermission - Role
            modelBuilder.Entity<RolepermissionModel>()
                .HasOne(rp => rp.Role)
                .WithMany() // One role can have many permissions
                .HasForeignKey(rp => rp.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            // RolePermission - Permission
            modelBuilder.Entity<RolepermissionModel>()
                .HasOne(rp => rp.Permission)
                .WithMany() // One permission can be associated with many roles
                .HasForeignKey(rp => rp.PermissionId)
                .OnDelete(DeleteBehavior.Restrict);

            // Receipt - Discount
            modelBuilder.Entity<ReceiptModel>()
                .HasOne(r => r.Discount)
                .WithMany() // One discount can be applied to many receipts
                .HasForeignKey(r => r.DiscountId)
                .OnDelete(DeleteBehavior.Restrict);

            // AdditionalFee - Receipt
            modelBuilder.Entity<AdditionalFeeModel>()
                .HasOne(af => af.Receipt)  // Each additional fee is tied to a receipt
                .WithMany(r => r.AdditionalFees) // Receipt has many additional fees
                .HasForeignKey(af => af.ReceiptId)
                .OnDelete(DeleteBehavior.Cascade);

            // ServiceUsage - Booking
            modelBuilder.Entity<ServiceUsageModel>()
                .HasOne(su => su.Booking)
                .WithMany(b => b.ServiceUsage) // A booking can have many service usages
                .HasForeignKey(su => su.BookingId)
                .OnDelete(DeleteBehavior.Restrict);

            // ServiceUsage - Service
            modelBuilder.Entity<ServiceUsageModel>()
                .HasOne(su => su.Service)
                .WithMany() // A service can be used many times in service usages
                .HasForeignKey(su => su.ServiceId)
                .OnDelete(DeleteBehavior.Restrict);

            // Receipt - Booking
            modelBuilder.Entity<ReceiptModel>()
                .HasOne(r => r.Booking)
                .WithOne()  // Assuming one-to-one relationship (Booking-Receipt)
                .HasForeignKey<ReceiptModel>(r => r.BookingId)
                .OnDelete(DeleteBehavior.Restrict); // Optional: Restrict delete

            //Review - User
            modelBuilder.Entity<ReviewModel>()
                .HasOne(rv => rv.Users)
                .WithMany()
                .HasForeignKey(rv => rv.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            //Review - Room
            modelBuilder.Entity<ReviewModel>()
                .HasOne(rv => rv.Rooms)
                .WithMany()
                .HasForeignKey(rv => rv.RoomId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}