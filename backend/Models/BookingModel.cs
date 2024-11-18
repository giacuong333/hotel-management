using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
      public class BookingModel
      {
            public BookingModel() { }

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
            public int? RoomId { get; set; }

            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public DateTime CreatedAt { get; set; }

            [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
            public DateTime? UpdatedAt { get; set; }

            public DateTime? DeletedAt { get; set; }

            // Navigations
            [ForeignKey("CustomerId")]
            public virtual UserModel? Customer { get; set; }
            [ForeignKey("StaffCheckInId")]
            public virtual UserModel? StaffCheckIn { get; set; }
            [ForeignKey("StaffCheckOutId")]
            public virtual UserModel? StaffCheckOut { get; set; }
            [ForeignKey("RoomId")]
            public virtual RoomModel? Room { get; set; }
            public ICollection<ServiceUsageModel>? ServiceUsage { get; set; }
      }
}
