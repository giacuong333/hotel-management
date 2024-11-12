using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
      public class BookingDetailModel
      {
            public BookingDetailModel() { }

            [Key]
            public int Id { get; set; }

            public int BookingId { get; set; }
            public int RoomId { get; set; }
            public DateTime? DeletedAt { get; set; }

            // Navigation properties
            [ForeignKey("BookingId")]
            public virtual BookingModel? Booking { get; set; }

            [ForeignKey("RoomId")]
            public virtual RoomModel? Room { get; set; }
      }
}
