using System.Reflection.Metadata;

namespace backend.Models
{
    public class GalleryModel
    {
        public GalleryModel() { }
        public GalleryModel(int? id, int? room, byte[]? image)
        {
            this.Id = id;
            this.Room = room;
            this.Image = image;
        }

        public int? Id { get; set; }
        public int? Room { get; set; }
        public byte[]? Image { get; set; }
    }
}
