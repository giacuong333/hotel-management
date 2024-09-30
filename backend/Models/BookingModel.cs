using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
      public class BookingModel
      {
            // Parameterless constructor required by EF Core
            public BookingModel() { }

            public BookingModel(int? id, int? staffId, int? customerId, int? roomId, RoomModel? room, UserModel? staff, UserModel? customer, DateTime? checkIn, DateTime? checkOut, int? status, DateTime createdAt, DateTime? updatedAt, DateTime? deletedAt)
            {
                  Id = id;
                  StaffId = staffId;
                  CustomerId = customerId;
                  RoomId = roomId;
                  Room = room;
                  Staff = staff;
                  Customer = customer;
                  CheckIn = checkIn;
                  CheckOut = checkOut;
                  Status = status;
                  CreatedAt = createdAt;
                  UpdatedAt = updatedAt;
                  DeletedAt = deletedAt;
            }

            [Key]
            public int? Id { get; set; }

            [ForeignKey("Staff")]
            public int? StaffId { get; set; }
            public UserModel? Staff { get; set; } // Navigation property for Staff


            [ForeignKey("Customer")]
            public int? CustomerId { get; set; }
            public UserModel? Customer { get; set; } // Navigation property for Customer


            [ForeignKey("Room")]
            public int? RoomId { get; set; }
            public RoomModel? Room { get; set; } // Navigation property for Room

            public DateTime? CheckIn { get; set; }
            public DateTime? CheckOut { get; set; }
            public int? Status { get; set; }

            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public DateTime? CreatedAt { get; set; }

            [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
            public DateTime? UpdatedAt { get; set; }

            public DateTime? DeletedAt { get; set; }
      }
}
