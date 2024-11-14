using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using backend.Database;
using backend.Models;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618    
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            // AdditionalFee
            modelBuilder.Entity<AdditionalFeeModel>(b =>
                    {
                        b.Property<int?>("Id")
                            .ValueGeneratedOnAdd()
                            .HasColumnType("int");

                        MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                        b.Property<int?>("ReceiptId")
                            .HasColumnType("int");

                        b.Property<string>("Name")
                            .HasColumnType("varchar(255)");

                        b.Property<float?>("Price")
                            .HasColumnType("float");

                        b.HasKey("Id");

                        b.HasIndex("ReceiptId");

                        b.ToTable("AdditionalFee");

                        b.HasOne("backend.Models.ReceiptModel", "Receipt")
                            .WithMany() // Assuming a receipt can have many additional fees
                            .HasForeignKey("ReceiptId")
                            .OnDelete(DeleteBehavior.Cascade); // Adjust as needed

                        // Navigation properties (optional for code readability)
                        b.Navigation("Receipt");
                    });

            // BookingModel
            modelBuilder.Entity<BookingModel>(b =>
            {
                b.Property<int?>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                b.Property<DateTime?>("CheckIn")
                    .HasColumnType("datetime(6)");

                b.Property<DateTime?>("CheckOut")
                    .HasColumnType("datetime(6)");

                b.Property<DateTime>("CreatedAt")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("datetime(6)");

                b.Property<string>("CustomerEmail")
                    .HasColumnType("longtext");

                b.Property<int?>("CustomerId")
                    .HasColumnType("int");

                b.Property<string>("CustomerName")
                    .HasColumnType("longtext");

                b.Property<string>("CustomerPhoneNumber")
                    .HasColumnType("longtext");

                b.Property<DateTime?>("DeletedAt")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnType("datetime(6)");

                b.Property<int?>("StaffCheckInId")
                    .HasColumnType("int");

                b.Property<int?>("StaffCheckOutId")
                    .HasColumnType("int");

                b.Property<int?>("Status")
                    .HasColumnType("int");

                b.Property<DateTime?>("UpdatedAt")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnType("datetime(6)");

                MySqlPropertyBuilderExtensions.UseMySqlComputedColumn(b.Property<DateTime?>("UpdatedAt"));

                b.HasKey("Id");

                b.HasIndex("CustomerId");

                b.HasIndex("StaffCheckInId");

                b.HasIndex("StaffCheckOutId");

                b.ToTable("Booking");

                // Relationships
                b.HasOne("backend.Models.UserModel", "Customer")
                    .WithMany()  // You can specify a collection navigation property in UserModel if needed
                    .HasForeignKey("CustomerId")
                    .OnDelete(DeleteBehavior.SetNull);

                b.HasOne("backend.Models.UserModel", "StaffCheckIn")
                    .WithMany()  // You can specify a collection navigation property in UserModel if needed
                    .HasForeignKey("StaffCheckInId")
                    .OnDelete(DeleteBehavior.SetNull);

                b.HasOne("backend.Models.UserModel", "StaffCheckOut")
                    .WithMany()  // You can specify a collection navigation property in UserModel if needed
                    .HasForeignKey("StaffCheckOutId")
                    .OnDelete(DeleteBehavior.SetNull);
            });

            // BookingDetailModel
            modelBuilder.Entity<BookingDetailModel>(b =>
                    {
                        b.Property<int?>("Id")
                            .ValueGeneratedOnAdd()
                            .HasColumnType("int");

                        MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                        b.Property<int?>("BookingId")
                            .HasColumnType("int");

                        b.Property<int?>("RoomId")
                            .HasColumnType("int");

                        b.HasKey("Id");

                        b.HasIndex("BookingId");
                        b.HasIndex("RoomId");

                        b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime(6)");

                        b.ToTable("BookingDetail");

                        // Setting up relationships
                        b.HasOne("backend.Models.BookingModel", "Booking")
                            .WithMany("BookingDetails") // This should be declared in the BookingModel
                            .HasForeignKey("BookingId")
                            .OnDelete(DeleteBehavior.Cascade);

                        b.HasOne("backend.Models.RoomModel", "Room")
                            .WithMany("BookingDetails") // This should be declared in the RoomModel
                            .HasForeignKey("RoomId")
                            .OnDelete(DeleteBehavior.Cascade);
                    });

            // DiscountModel
            modelBuilder.Entity<DiscountModel>(b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime?>("EndAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("StartAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("Status")
                        .HasColumnType("tinyint(1)");

                    b.Property<decimal>("Value") // Change to decimal
                        .HasColumnType("decimal(18,2)"); // Consider precision for money values

                    b.HasKey("Id");

                    b.ToTable("Discount");
                });

            // FeedbackModel
            modelBuilder.Entity<FeedBackModel>(b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<int>("RoomId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    // Define the foreign key relationships if needed
                    b.HasOne<UserModel>() // Assuming UserModel exists
                        .WithMany() // Adjust to your relationship
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade); // Adjust cascade behavior if needed

                    b.HasOne<RoomModel>() // Assuming RoomModel exists
                        .WithMany() // Adjust to your relationship
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade); // Adjust cascade behavior if needed

                    b.ToTable("Feedback");
                });

            // GalleryModel
            modelBuilder.Entity<GalleryModel>(b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                    b.Property<byte[]>("Image")
                        .HasColumnType("longblob");

                    b.Property<int?>("RoomId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Gallery");
                });

            // PermissionModel
            modelBuilder.Entity<PermissionModel>(b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<byte?>("Status")
                        .HasColumnType("tinyint unsigned");

                    b.HasKey("Id");

                    b.ToTable("Permission");
                });

            // ReviewModel
            modelBuilder.Entity<ReviewModel>(b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                    b.Property<string>("Comment")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("RoomId")
                        .HasColumnType("int");

                    b.Property<int?>("Status")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.HasIndex("UserId");

                    b.ToTable("Review");
                });

            // RoleModel
            modelBuilder.Entity<RoleModel>(b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Role");
                });

            // ReceiptModel
            modelBuilder.Entity<ReceiptModel>(b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("StaffId")
                        .HasColumnType("int");

                    b.Property<int?>("BookingId")
                        .HasColumnType("int");

                    b.Property<int?>("DiscountId")
                        .HasColumnType("int");

                    b.Property<float?>("Total")
                        .HasColumnType("float");

                    b.Property<DateTime?>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime(6)")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<DateTime?>("UpdatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime(6)")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("StaffId");
                    b.HasIndex("BookingId");
                    b.HasIndex("DiscountId");

                    b.ToTable("Receipt");

                    // Relationships
                    b.HasOne("backend.Models.UserModel", "Staff")
                        .WithMany()
                        .HasForeignKey("StaffId")
                        .OnDelete(DeleteBehavior.Restrict); // Adjust as needed

                    b.HasOne("backend.Models.BookingModel", "Booking")
                        .WithMany()
                        .HasForeignKey("BookingId")
                        .OnDelete(DeleteBehavior.Cascade); // Adjust as needed

                    b.HasOne("backend.Models.DiscountModel", "Discount")
                        .WithMany()
                        .HasForeignKey("DiscountId")
                        .OnDelete(DeleteBehavior.SetNull); // Adjust as needed

                    // Navigation properties (optional for code readability)
                    b.Navigation("Staff");
                    b.Navigation("Booking");
                    b.Navigation("Discount");
                });

            // RolePermissionModel
            modelBuilder.Entity<RolepermissionModel>(b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                    b.Property<int?>("PermissionId")
                        .HasColumnType("int");

                    b.Property<string>("Resource")
                        .HasColumnType("longtext");

                    b.Property<int?>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Rolepermission");
                });

            // RoomModel
            modelBuilder.Entity<RoomModel>(b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int?>("Area")
                        .HasColumnType("int");

                    b.Property<int?>("BedNum")
                        .HasColumnType("int");

                    b.Property<DateTime?>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime(6)");

                    // Removed UseMySqlIdentityColumn for CreatedAt, as it is a timestamp, not an identity column.

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<float?>("Price")
                        .HasColumnType("float");

                    b.Property<int?>("Status")
                        .HasColumnType("int");

                    b.Property<byte[]>("Thumbnail")
                        .HasColumnType("longblob");

                    b.Property<string>("Type")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("UpdatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime(6)");

                    // Removed UseMySqlComputedColumn, since Computed should be handled automatically by EF Core

                    b.HasKey("Id");

                    b.ToTable("Room");
                });

            // ServiceModel
            modelBuilder.Entity<ServiceModel>(b =>
            {
                b.Property<int?>("Id")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("int");

                MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                b.Property<DateTime?>("CreatedAt")
                    .ValueGeneratedOnAdd()
                    .HasColumnType("datetime(6)")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .IsRequired(false);

                b.Property<DateTime?>("UpdatedAt")
                    .ValueGeneratedOnUpdate()
                    .HasColumnType("datetime(6)")
                    .IsRequired(false);

                b.Property<DateTime?>("DeletedAt")
                    .ValueGeneratedOnUpdate()
                    .HasColumnType("datetime(6)")
                    .IsRequired(false);

                b.Property<string>("Name")
                    .HasColumnType("longtext");

                b.Property<float?>("Price")
                    .HasColumnType("float");

                b.Property<byte?>("Status")
                    .HasColumnType("tinyint unsigned");

                b.HasKey("Id");

                b.ToTable("Service");
            });

            // ServiceUsageModel
            modelBuilder.Entity<ServiceUsageModel>(b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                    b.Property<int?>("BookingId")
                        .HasColumnType("int");

                    b.Property<int?>("ServiceId")
                        .HasColumnType("int");

                    b.Property<float?>("TotalPrice")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("BookingId");

                    b.HasIndex("ServiceId");

                    b.ToTable("ServiceUsage");

                    b.HasOne("backend.Models.BookingModel", "Booking")
                       .WithMany("ServiceUsage")
                       .HasForeignKey("BookingId")
                       .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("backend.Models.ServiceModel", "Service")
                        .WithMany("ServiceUsage")
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            // UserModel
            modelBuilder.Entity<UserModel>(entity =>
            {
                // Primary Key
                entity.HasKey(u => u.Id);

                // Configure property types and nullability
                entity.Property(u => u.Name)
                    .HasColumnType("varchar(255)") // Change column type as needed
                    .IsRequired();

                entity.Property(u => u.Email)
                    .HasColumnType("varchar(255)") // Change column type as needed
                    .IsRequired();

                entity.Property(u => u.Password)
                    .HasColumnType("varchar(255)") // Change column type as needed
                    .IsRequired();

                entity.Property(u => u.PhoneNumber)
                    .HasColumnType("varchar(15)") // Change column type as needed
                    .IsRequired(false);

                entity.Property(u => u.Gender)
                    .HasColumnType("varchar(10)") // Change column type as needed
                    .IsRequired(false);

                entity.Property(u => u.Avatar)
                    .HasColumnType("longblob") // Assuming storing avatar as a byte array
                    .IsRequired(false);

                entity.Property(u => u.RoleId)
                    .IsRequired(false); // Make RoleId nullable since it can be null

                entity.Property(u => u.FirstBook)
                    .IsRequired(false);

                entity.Property(u => u.Dob)
                    .HasColumnType("datetime")
                    .IsRequired(false);

                // Configure timestamps
                entity.Property(u => u.CreatedAt)
                    .HasColumnType("datetime(6)")
                    .ValueGeneratedOnAdd()  // Identity column behavior
                    .IsRequired();

                entity.Property(u => u.UpdatedAt)
                    .HasColumnType("datetime(6)")
                    .ValueGeneratedOnAddOrUpdate() // Computed column behavior
                    .IsRequired(false);

                entity.Property(u => u.DeletedAt)
                    .HasColumnType("datetime(6)")
                    .IsRequired(false);

                // Configure relationship with RoleModel
                entity.HasOne(u => u.Roles)
                    .WithMany()  // Assuming Roles has a navigation property to Users
                    .HasForeignKey(u => u.RoleId)
                    .OnDelete(DeleteBehavior.SetNull); // Setting null if role is deleted

                // Additional configurations (e.g., constraints, indexes) can go here
            });
        }
    }
}
