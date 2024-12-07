using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class LockRoomModel
    {
        public LockRoomModel() { }

        [Key]
        public int Id { get; set; }
        public int RoomId { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        [ForeignKey("RoomId")]
        public virtual RoomModel? Room { get; set; }
    }
}
