using System.Web.Helpers;
using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;

public static class Seed
{
    public static async Task Initialize(DatabaseContext context)
    {
        // Ensure the database is created
        await context.Database.MigrateAsync();

        // Seed Roles
        if (!context.Role.Any())
        {
            // Insert roles
            context.Role.AddRange(
                new RoleModel { Id = 1, Name = "manager" },
                new RoleModel { Id = 2, Name = "admin" },
                new RoleModel { Id = 3, Name = "employee" },
                new RoleModel { Id = 4, Name = "customer" }
            );
            await context.SaveChangesAsync();
        }

        // Seed Permissions
        if (!context.Permission.Any())
        {
            // Insert permissions
            context.Permission.AddRange(
                new PermissionModel { Id = 1, Name = "Read User" },
                new PermissionModel { Id = 2, Name = "Create User" },
                new PermissionModel { Id = 3, Name = "Update User" },
                new PermissionModel { Id = 4, Name = "Delete User" },
                new PermissionModel { Id = 5, Name = "Read Room" },
                new PermissionModel { Id = 6, Name = "Create Room" },
                new PermissionModel { Id = 7, Name = "Update Room" },
                new PermissionModel { Id = 8, Name = "Delete Room" },
                new PermissionModel { Id = 9, Name = "Read Booking" },
                new PermissionModel { Id = 10, Name = "Create Booking" },
                new PermissionModel { Id = 11, Name = "Update Booking" },
                new PermissionModel { Id = 12, Name = "Delete Booking" },
                new PermissionModel { Id = 13, Name = "Read Discount" },
                new PermissionModel { Id = 14, Name = "Create Discount" },
                new PermissionModel { Id = 15, Name = "Update Discount" },
                new PermissionModel { Id = 16, Name = "Delete Discount" },
                new PermissionModel { Id = 17, Name = "Read Feedback" },
                new PermissionModel { Id = 18, Name = "Create Feedback" },
                new PermissionModel { Id = 19, Name = "Update Feedback" },
                new PermissionModel { Id = 20, Name = "Delete Feedback" },
                new PermissionModel { Id = 21, Name = "Read Gallery" },
                new PermissionModel { Id = 22, Name = "Create Gallery" },
                new PermissionModel { Id = 23, Name = "Update Gallery" },
                new PermissionModel { Id = 24, Name = "Delete Gallery" },
                new PermissionModel { Id = 25, Name = "Read Receipt" },
                new PermissionModel { Id = 26, Name = "Create Receipt" },
                new PermissionModel { Id = 27, Name = "Update Receipt" },
                new PermissionModel { Id = 28, Name = "Delete Receipt" },
                new PermissionModel { Id = 29, Name = "Read Review" },
                new PermissionModel { Id = 30, Name = "Create Review" },
                new PermissionModel { Id = 31, Name = "Update Review" },
                new PermissionModel { Id = 32, Name = "Delete Review" },
                new PermissionModel { Id = 33, Name = "Read Service" },
                new PermissionModel { Id = 34, Name = "Create Service" },
                new PermissionModel { Id = 35, Name = "Update Service" },
                new PermissionModel { Id = 36, Name = "Delete Service" },
                new PermissionModel { Id = 37, Name = "Read AdditionalFee" },
                new PermissionModel { Id = 38, Name = "Create AdditionalFee" },
                new PermissionModel { Id = 39, Name = "Update AdditionalFee" },
                new PermissionModel { Id = 40, Name = "Delete AdditionalFee" },
                new PermissionModel { Id = 41, Name = "Read Statistic" },
                new PermissionModel { Id = 42, Name = "Read Role" },
                new PermissionModel { Id = 43, Name = "Create Role" },
                new PermissionModel { Id = 44, Name = "Update Role" },
                new PermissionModel { Id = 45, Name = "Delete Role" },
                new PermissionModel { Id = 46, Name = "Assigning Permissions to role" },
                new PermissionModel { Id = 47, Name = "Role assignment" },
                new PermissionModel { Id = 48, Name = "Read Dashboard" }
            );
            await context.SaveChangesAsync();
        }

        // Seed RolePermissions
        if (!context.Rolepermission.Any())
        {
            // Insert rolepermissions
            context.Rolepermission.AddRange(
                new RolepermissionModel { RoleId = 2, PermissionId = 1, Resource = "User" },
                new RolepermissionModel { RoleId = 2, PermissionId = 2, Resource = "User" },
                new RolepermissionModel { RoleId = 2, PermissionId = 3, Resource = "User" },
                new RolepermissionModel { RoleId = 2, PermissionId = 4, Resource = "User" },
                new RolepermissionModel { RoleId = 2, PermissionId = 5, Resource = "Room" },
                new RolepermissionModel { RoleId = 2, PermissionId = 6, Resource = "Room" },
                new RolepermissionModel { RoleId = 2, PermissionId = 7, Resource = "Room" },
                new RolepermissionModel { RoleId = 2, PermissionId = 8, Resource = "Room" },
                new RolepermissionModel { RoleId = 2, PermissionId = 9, Resource = "Booking" },
                new RolepermissionModel { RoleId = 2, PermissionId = 10, Resource = "Booking" },
                new RolepermissionModel { RoleId = 2, PermissionId = 11, Resource = "Booking" },
                new RolepermissionModel { RoleId = 2, PermissionId = 12, Resource = "Booking" },
                new RolepermissionModel { RoleId = 2, PermissionId = 13, Resource = "Discount" },
                new RolepermissionModel { RoleId = 2, PermissionId = 14, Resource = "Discount" },
                new RolepermissionModel { RoleId = 2, PermissionId = 15, Resource = "Discount" },
                new RolepermissionModel { RoleId = 2, PermissionId = 16, Resource = "Discount" },
                new RolepermissionModel { RoleId = 2, PermissionId = 17, Resource = "FeedBack" },
                new RolepermissionModel { RoleId = 2, PermissionId = 18, Resource = "FeedBack" },
                new RolepermissionModel { RoleId = 2, PermissionId = 19, Resource = "FeedBack" },
                new RolepermissionModel { RoleId = 2, PermissionId = 20, Resource = "FeedBack" },
                new RolepermissionModel { RoleId = 2, PermissionId = 21, Resource = "Gallery" },
                new RolepermissionModel { RoleId = 2, PermissionId = 22, Resource = "Gallery" },
                new RolepermissionModel { RoleId = 2, PermissionId = 23, Resource = "Gallery" },
                new RolepermissionModel { RoleId = 2, PermissionId = 24, Resource = "Gallery" },
                new RolepermissionModel { RoleId = 2, PermissionId = 25, Resource = "Receipt" },
                new RolepermissionModel { RoleId = 2, PermissionId = 26, Resource = "Receipt" },
                new RolepermissionModel { RoleId = 2, PermissionId = 27, Resource = "Receipt" },
                new RolepermissionModel { RoleId = 2, PermissionId = 28, Resource = "Receipt" },
                new RolepermissionModel { RoleId = 2, PermissionId = 29, Resource = "Review" },
                new RolepermissionModel { RoleId = 2, PermissionId = 30, Resource = "Review" },
                new RolepermissionModel { RoleId = 2, PermissionId = 31, Resource = "Review" },
                new RolepermissionModel { RoleId = 2, PermissionId = 32, Resource = "Review" },
                new RolepermissionModel { RoleId = 2, PermissionId = 33, Resource = "Service" },
                new RolepermissionModel { RoleId = 2, PermissionId = 34, Resource = "Service" },
                new RolepermissionModel { RoleId = 2, PermissionId = 35, Resource = "Service" },
                new RolepermissionModel { RoleId = 2, PermissionId = 36, Resource = "Service" },
                new RolepermissionModel { RoleId = 2, PermissionId = 37, Resource = "AdditionalFee" },
                new RolepermissionModel { RoleId = 2, PermissionId = 38, Resource = "AdditionalFee" },
                new RolepermissionModel { RoleId = 2, PermissionId = 39, Resource = "AdditionalFee" },
                new RolepermissionModel { RoleId = 2, PermissionId = 40, Resource = "AdditionalFee" },
                new RolepermissionModel { RoleId = 2, PermissionId = 41, Resource = "Statistic" },
                new RolepermissionModel { RoleId = 2, PermissionId = 42, Resource = "Role" },
                new RolepermissionModel { RoleId = 2, PermissionId = 43, Resource = "Role" },
                new RolepermissionModel { RoleId = 2, PermissionId = 44, Resource = "Role" },
                new RolepermissionModel { RoleId = 2, PermissionId = 45, Resource = "Role" },
                new RolepermissionModel { RoleId = 2, PermissionId = 46, Resource = "Role" },
                new RolepermissionModel { RoleId = 2, PermissionId = 47, Resource = "Role" },
                new RolepermissionModel { RoleId = 2, PermissionId = 48, Resource = "Dashboard" }
            );
            await context.SaveChangesAsync();
        }

        // Seed Users
        if (!context.User.Any())
        {
            context.User.AddRange(
                 new UserModel
                 {
                     Id = 1,
                     Name = "Cuong",
                     Email = "cuong@gmail.com",
                     Password = Crypto.HashPassword("0"),
                     PhoneNumber = "0948800917",
                     Gender = "male",
                     Dob = new DateTime(2024, 10, 12),
                     RoleId = 2
                 },

                 new UserModel
                 {
                     Id = 2,
                     Name = "Nhung Vy",
                     Email = "nhungvy@gmail.com",
                     Password = Crypto.HashPassword("0"),
                     PhoneNumber = "0352372186",
                     Gender = "female",
                     Dob = new DateTime(2024, 1, 1),
                     RoleId = 4
                 },
                new UserModel
                {
                    Id = 3,
                    Name = "Minh Canh",
                    Email = "minhcanh@gmail.com",
                    Password = Crypto.HashPassword("0"),
                    PhoneNumber = "023569897",
                    Gender = "male",
                    Dob = new DateTime(2024, 1, 1),
                    RoleId = 4
                },
                new UserModel
                {
                    Id = 4,
                    Name = "Kim Bac",
                    Email = "kimbac@gmail.com",
                    Password = Crypto.HashPassword("0"),
                    PhoneNumber = "0235566987",
                    Gender = "female",
                    Dob = new DateTime(2024, 1, 2),
                    RoleId = 4
                },
                new UserModel
                {
                    Id = 5,
                    Name = "Nhu Quynh",
                    Email = "nhuqynh@gmail.com",
                    Password = Crypto.HashPassword("0"),
                    PhoneNumber = "0255566589",
                    Gender = "female",
                    Dob = new DateTime(2024, 1, 1),
                    RoleId = 4
                },
                new UserModel
                {
                    Id = 6,
                    Name = "Thanh",
                    Email = "thanh@gmail.com",
                    Password = Crypto.HashPassword("0"),
                    PhoneNumber = "0425546897",
                    Gender = "male",
                    Dob = new DateTime(2024, 3, 1),
                    RoleId = 4
                },
                new UserModel
                {
                    Id = 7,
                    Name = "Phi",
                    Email = "phi@gmail.com",
                    Password = Crypto.HashPassword("0"),
                    PhoneNumber = "025225263",
                    Gender = "female",
                    Dob = new DateTime(2024, 5, 1),
                    RoleId = 4
                },
                new UserModel
                {
                    Id = 8,
                    Name = "Thinh",
                    Email = "thinh@gmail.com",
                    Password = Crypto.HashPassword("0"),
                    PhoneNumber = "0325566987",
                    Gender = "male",
                    Dob = new DateTime(2024, 10, 5),
                    RoleId = 3
                },
                 new UserModel
                 {
                     Id = 9,
                     Name = "Vo Dinh Van",
                     Email = "dinhvanvo510@gmail.com",
                     Password = Crypto.HashPassword("1"),
                     PhoneNumber = "0398416537",
                     Gender = "male",
                     Dob = new DateTime(2024, 10, 12),
                     RoleId = 2
                 }
            );
            await context.SaveChangesAsync();
        }

        // Seed Room 
        if (!context.Room.Any())
        {
            context.Room.AddRange(
                new RoomModel
                {
                    Id = 1,
                    Name = "Presidential Suite",
                    Type = "VIP",
                    Description = "The Presidential Suite is the pinnacle of luxury and sophistication, offering an unparalleled level of comfort and style. This suite includes a spacious living area, a king-size bed, a private balcony with stunning views, and a dedicated butler service.",
                    BedNum = 4,
                    Status = 2,
                    Price = 5000000,
                    Area = 50
                },
                new RoomModel
                {
                    Id = 2,
                    Name = "Poolside Room",
                    Type = "VIP",
                    Description = "Relax in our stylish Poolside Room, designed to offer the ultimate blend of comfort and luxury. Step out onto your private patio and enjoy the serene view of the pool, surrounded by lush tropical landscaping.",
                    BedNum = 4,
                    Status = 2,
                    Price = 5000000,
                    Area = 50
                },
                new RoomModel
                {
                    Id = 3,
                    Name = "Ocean View Room",
                    Type = "VIP",
                    Description = "Experience the ultimate in coastal luxury with our Ocean View Room. Situated on the upper floors, these rooms offer panoramic views of the ocean, along with plush furnishings and premium amenities for the perfect stay.",
                    BedNum = 6,
                    Status = 3,
                    Price = 8000000,
                    Area = 100
                },
                new RoomModel
                {
                    Id = 4,
                    Name = "Mountain View Room",
                    Type = "VIP",
                    Description = "Experience ultimate tranquility in our Mountain View Deluxe Room, offering breathtaking panoramic views of the surrounding mountains. Designed with relaxation in mind, this room features a spacious layout and modern amenities.",
                    BedNum = 2,
                    Status = 2,
                    Price = 1000000,
                    Area = 40
                },
                new RoomModel
                {
                    Id = 5,
                    Name = "Luxury Suite",
                    Type = "VIP",
                    Description = "A luxury suite room is typically a premium, upscale accommodation in a hotel or resort, offering a high level of comfort, exquisite decor, and upscale amenities. This suite is perfect for guests seeking exclusivity and elegance.",
                    BedNum = 1,
                    Status = 1,
                    Price = 200000,
                    Area = 20
                },
                new RoomModel
                {
                    Id = 6,
                    Name = "Junior Suite",
                    Type = "VIP",
                    Description = "A Junior Suite Room typically refers to a type of hotel room that offers more space and amenities compared to a standard room. This suite is perfect for guests who need extra space, a cozy sitting area, and enhanced comfort.",
                    BedNum = 1,
                    Status = 1,
                    Price = 300000,
                    Area = 30
                }
            );
            await context.SaveChangesAsync();
        }

        // Seed Services
        if (!context.Service.Any())
        {
            context.Service.AddRange(
            new ServiceModel { Id = 1, Name = "Đón tại sân bay", Price = 200000, Status = 1 },
            new ServiceModel { Id = 2, Name = "Buffet sáng", Price = 150000, Status = 1 },
            new ServiceModel { Id = 3, Name = "Villa tour", Price = 250000, Status = 1 }
            );
            await context.SaveChangesAsync();
        }

        // Seed Bookings
        if (!context.Booking.Any())
        {
            context.Booking.AddRange(
                new()
                {
                    Id = 1,
                    CustomerId = 2,  // Use actual ID
                    StaffCheckInId = 2,
                    RoomId = 1,
                    CheckIn = new DateTime(2024, 11, 20),
                    CheckOut = new DateTime(2024, 11, 29),
                    Status = 1
                },
                new()
                {
                    Id = 2,
                    CustomerId = 3,  // Use actual ID
                    StaffCheckInId = 2,
                    RoomId = 2,
                    CheckIn = new DateTime(2024, 11, 20),
                    CheckOut = new DateTime(2024, 11, 29),
                    Status = 1
                },
                new()
                {
                    Id = 3,
                    CustomerId = 4,  // Use actual ID
                    StaffCheckInId = 2,
                    RoomId = 3,
                    CheckIn = new DateTime(2024, 11, 21),
                    CheckOut = new DateTime(2024, 11, 29),
                    Status = 2
                },
                new()
                {
                    Id = 4,
                    CustomerId = 2,  // Use actual ID
                    StaffCheckInId = 2,
                    RoomId = 4,
                    CheckIn = new DateTime(2024, 12, 29),
                    CheckOut = new DateTime(2024, 1, 3),
                    Status = 1
                }
            );
            await context.SaveChangesAsync();
        }

        // Seed ServiceUsage
        if (!context.ServiceUsage.Any())
        {
            context.ServiceUsage.AddRange(
                new ServiceUsageModel { Id = 1, BookingId = 1, ServiceId = 1, Quantity = 1 },
                new ServiceUsageModel { Id = 2, BookingId = 1, ServiceId = 2, Quantity = 1 },
                new ServiceUsageModel { Id = 3, BookingId = 1, ServiceId = 3, Quantity = 1 }
            );
            await context.SaveChangesAsync();
        }

        // Seed Discounts
        if (!context.Discount.Any())
        {
            context.Discount.AddRange(
                new() { Id = 1, Name = "Black Friday Sale", Value = 20, Status = true, StartAt = new DateTime(2024, 11, 24), EndAt = new DateTime(2024, 11, 26) },
                new() { Id = 2, Name = "New Year Discount", Value = 15, Status = true, StartAt = new DateTime(2024, 12, 31), EndAt = new DateTime(2025, 1, 2) },
                new() { Id = 3, Name = "Holiday Season Offer", Value = 10, Status = true, StartAt = new DateTime(2024, 12, 1), EndAt = new DateTime(2024, 12, 15) }
            );
            await context.SaveChangesAsync();
        }
        //Seed Feedback
        if (!context.Feedback.Any())
        {
            context.Feedback.AddRange(
                new() { Id = 1, UserId = 2, RoomId = 1, Description = "Good service", CreatedAt = new DateTime(2024, 11, 20) },
                new() { Id = 2, UserId = 3, RoomId = 2, Description = "Good service", CreatedAt = new DateTime(2024, 11, 20) },
                new() { Id = 3, UserId = 4, RoomId = 3, Description = "Good service", CreatedAt = new DateTime(2024, 11, 21) },
                new() { Id = 4, UserId = 2, RoomId = 4, Description = "Good service", CreatedAt = new DateTime(2024, 12, 29) }
            );
        }
        // Seed Receipts
        if (!context.Receipt.Any())
        {
            context.Receipt.AddRange(
                new() { Id = 1, BookingId = 1, DiscountId = 1, Total = 18240000 },
                new() { Id = 2, BookingId = 2, DiscountId = 2, Total = 10800000 },
                new() { Id = 3, BookingId = 3, DiscountId = 3, Total = 240000 },
                new() { Id = 4, BookingId = 4, DiscountId = 1, Total = 200000 }
            );
            await context.SaveChangesAsync();
        }

        // Seed AdditionalFees
        if (!context.AdditionalFee.Any())
        {
            context.AdditionalFee.AddRange(
                new AdditionalFeeModel { Id = 1, ReceiptId = 1, Name = "Renting Cars", Price = 300000 },
                new AdditionalFeeModel { Id = 2, ReceiptId = 1, Name = "Renting Shoes", Price = 100000 },
                new AdditionalFeeModel { Id = 3, ReceiptId = 1, Name = "5 bottles water", Price = 50000 }
            );
            await context.SaveChangesAsync();
        }
    }
}
