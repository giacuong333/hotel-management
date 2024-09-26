using System.Reflection.Metadata;

namespace backend.Models
{
    public class GalleryModel
    {
        public GalleryModel() { }
        public GalleryModel(int? id, int? room, Blob image)
        {
            this.Id = id;
            this.Room = room;
            this.Image = image;
        }

        public int? Id { get; set; }
        public int? Room { get;  set; }
        public Blob Image { get;  set; }
    }
}
