

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
      public class BookingDetailModel
      {
            // Parameterless constructor required by EF Core
            public BookingDetailModel() { }

            public BookingDetailModel(int? id, int? bookingId, int? roomId)
            {
                  Id = id;
                  BookingId = bookingId;
                  RoomId = roomId;
            }

            [Key]
            public int? Id { get; set; }
            public int? BookingId { get; set; }
            public int? RoomId { get; set; }

            [ForeignKey("RoomId")]
            public virtual RoomModel? Room { get; set; }
      }
}