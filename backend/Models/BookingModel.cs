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

            public BookingModel(int id, string? customerName, string? customerEmail, string? customerPhoneNumber, int? staffCheckInId, int? staffCheckOutId, DateTime? checkIn, DateTime? checkOut, int customerId, int? status, DateTime createdAt, DateTime? updatedAt, DateTime? deletedAt)
            {
                  Id = id;
                  CustomerName = customerName;
                  CustomerEmail = customerEmail;
                  CustomerPhoneNumber = customerPhoneNumber;
                  StaffCheckInId = staffCheckInId;
                  StaffCheckOutId = staffCheckOutId;
                  CheckIn = checkIn;
                  CheckOut = checkOut;
                  CustomerId = customerId;
                  Status = status;
                  CreatedAt = createdAt;
                  UpdatedAt = updatedAt;
                  DeletedAt = deletedAt;
            }

            [Key]
            public int Id { get; set; }
            public string? CustomerName { get; set; }
            public string? CustomerEmail { get; set; }
            public string? CustomerPhoneNumber { get; set; }
            public int? StaffCheckInId { get; set; }
            public int? StaffCheckOutId { get; set; }
            public DateTime? CheckIn { get; set; }
            public DateTime? CheckOut { get; set; }
            public int? Status { get; set; }
            public int? CustomerId { get; set; }

            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public DateTime CreatedAt { get; set; }

            [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
            public DateTime? UpdatedAt { get; set; }

            public DateTime? DeletedAt { get; set; }

            public virtual ICollection<BookingDetailModel>? BookingDetails { get; set; }

            [ForeignKey("CustomerId")]
            public virtual UserModel? Customer { get; set; }

            [ForeignKey("StaffCheckInId")]
            public virtual UserModel? StaffCheckIn { get; set; }

            [ForeignKey("StaffCheckOutId")]
            public virtual UserModel? StaffCheckOut { get; set; }

            public ICollection<ServiceUsageModel> ServiceUsage { get; set; } = new List<ServiceUsageModel>(); // A booking can have many service usages
      }
}
