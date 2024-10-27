using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;

namespace backend.Models
{
    public class GalleryModel
    {
        public GalleryModel() { }
        public GalleryModel(int? id, int? roomId, byte[]? image)
        {
            Id = id;
            RoomId = roomId;
            Image = image;
        }
        [Key]
        public int? Id { get; set; }
        public int? RoomId { get; set; }
        public byte[]? Image { get; set; }
    }
}
