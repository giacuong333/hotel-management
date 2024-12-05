﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Database;

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

            modelBuilder.Entity("ReceiptModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("BookingId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("DiscountId")
                        .HasColumnType("int");

                    b.Property<float?>("Total")
                        .HasColumnType("float");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("BookingId")
                        .IsUnique();

                    b.HasIndex("DiscountId");

                    b.ToTable("Receipt");
                });

            modelBuilder.Entity("RoomModel", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                    b.Property<int?>("Area")
                        .HasColumnType("int");

                    b.Property<int?>("BedNum")
                        .HasColumnType("int");

                    b.Property<DateTime?>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime(6)");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<DateTime?>("CreatedAt"));

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

                    MySqlPropertyBuilderExtensions.UseMySqlComputedColumn(b.Property<DateTime?>("UpdatedAt"));

                    b.HasKey("Id");

                    b.ToTable("Room");
                });

            modelBuilder.Entity("ServiceUsageModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("BookingId")
                        .HasColumnType("int");

                    b.Property<int?>("Quantity")
                        .HasColumnType("int");

                    b.Property<int?>("ServiceId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BookingId");

                    b.HasIndex("ServiceId");

                    b.ToTable("ServiceUsage");
                });

            modelBuilder.Entity("backend.Models.BookingModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CheckIn")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("CheckOut")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime(6)");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<DateTime>("CreatedAt"));

                    b.Property<string>("CustomerEmail")
                        .HasColumnType("longtext");

                    b.Property<int?>("CustomerId")
                        .HasColumnType("int");

                    b.Property<string>("CustomerName")
                        .HasColumnType("longtext");

                    b.Property<string>("CustomerPhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("RoomId")
                        .HasColumnType("int");

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

                    b.HasIndex("RoomId");

                    b.HasIndex("StaffCheckInId");

                    b.HasIndex("StaffCheckOutId");

                    b.ToTable("Booking");
                });

            modelBuilder.Entity("backend.Models.DiscountModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("EndAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("StartAt")
                        .HasColumnType("datetime(6)");

                    b.Property<bool?>("Status")
                        .HasColumnType("tinyint(1)");

                    b.Property<decimal?>("Value")
                        .HasColumnType("decimal(65,30)");

                    b.HasKey("Id");

                    b.ToTable("Discount");
                });

            modelBuilder.Entity("backend.Models.FeedBackModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("RoomId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.HasIndex("UserId");

                    b.ToTable("Feedback");
                });

            modelBuilder.Entity("backend.Models.GalleryModel", b =>
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

            modelBuilder.Entity("backend.Models.PermissionModel", b =>
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

            modelBuilder.Entity("backend.Models.ReviewModel", b =>
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

            modelBuilder.Entity("backend.Models.RoleModel", b =>
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

            modelBuilder.Entity("backend.Models.RolepermissionModel", b =>
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

                    b.HasIndex("PermissionId");

                    b.HasIndex("RoleId");

                    b.ToTable("Rolepermission");
                });

            modelBuilder.Entity("backend.Models.ServiceModel", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int?>("Id"));

                    b.Property<DateTime?>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime(6)");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<DateTime?>("CreatedAt"));

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<float?>("Price")
                        .HasColumnType("float");

                    b.Property<byte?>("Status")
                        .HasColumnType("tinyint unsigned");

                    b.Property<DateTime?>("UpdatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime(6)");

                    MySqlPropertyBuilderExtensions.UseMySqlComputedColumn(b.Property<DateTime?>("UpdatedAt"));

                    b.HasKey("Id");

                    b.ToTable("Service");
                });

            modelBuilder.Entity("backend.Models.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<byte[]>("Avatar")
                        .HasColumnType("longblob");

                    b.Property<DateTime?>("CreatedAt")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime(6)");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<DateTime?>("CreatedAt"));

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("Dob")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<bool?>("FirstBook")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Gender")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<int?>("RoleId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedAt")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime(6)");

                    MySqlPropertyBuilderExtensions.UseMySqlComputedColumn(b.Property<DateTime?>("UpdatedAt"));

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("ReceiptModel", b =>
                {
                    b.HasOne("backend.Models.BookingModel", "Booking")
                        .WithOne()
                        .HasForeignKey("ReceiptModel", "BookingId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("backend.Models.DiscountModel", "Discount")
                        .WithMany()
                        .HasForeignKey("DiscountId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Booking");

                    b.Navigation("Discount");
                });

            modelBuilder.Entity("ServiceUsageModel", b =>
                {
                    b.HasOne("backend.Models.BookingModel", "Booking")
                        .WithMany("ServiceUsage")
                        .HasForeignKey("BookingId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("backend.Models.ServiceModel", "Service")
                        .WithMany()
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Booking");

                    b.Navigation("Service");
                });

            modelBuilder.Entity("backend.Models.BookingModel", b =>
                {
                    b.HasOne("backend.Models.UserModel", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("RoomModel", "Room")
                        .WithMany()
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("backend.Models.UserModel", "StaffCheckIn")
                        .WithMany()
                        .HasForeignKey("StaffCheckInId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("backend.Models.UserModel", "StaffCheckOut")
                        .WithMany()
                        .HasForeignKey("StaffCheckOutId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Customer");

                    b.Navigation("Room");

                    b.Navigation("StaffCheckIn");

                    b.Navigation("StaffCheckOut");
                });

            modelBuilder.Entity("backend.Models.FeedBackModel", b =>
                {
                    b.HasOne("RoomModel", "Room")
                        .WithMany()
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("backend.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("backend.Models.ReviewModel", b =>
                {
                    b.HasOne("RoomModel", "Rooms")
                        .WithMany()
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("backend.Models.UserModel", "Users")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Rooms");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("backend.Models.RolepermissionModel", b =>
                {
                    b.HasOne("backend.Models.PermissionModel", "Permission")
                        .WithMany()
                        .HasForeignKey("PermissionId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("backend.Models.RoleModel", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Permission");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("backend.Models.UserModel", b =>
                {
                    b.HasOne("backend.Models.RoleModel", "Roles")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Roles");
                });

            modelBuilder.Entity("backend.Models.BookingModel", b =>
                {
                    b.Navigation("ServiceUsage");
                });
#pragma warning restore 612, 618
        }
    }
}
