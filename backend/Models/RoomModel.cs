using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;

namespace backend.Models
{
      public class RoomModel
      {
            public RoomModel() { }

            public RoomModel(int? id, byte[]? thumbnail, string? name, string? description, int? bedNum, int? maxNum, bool? isFull, float? price, int? area, DateTime? createdAt, DateTime? updatedAt, DateTime? deletedAt)
            {
                  Id = id;
                  Thumbnail = thumbnail;
                  Name = name;
                  Description = description;
                  BedNum = bedNum;
                  MaxNum = maxNum;
                  IsFull = isFull;
                  Price = price;
                  Area = area;
                  CreatedAt = createdAt;
                  UpdatedAt = updatedAt;
                  DeletedAt = deletedAt;
            }

            [Key] // Marks this as the primary key
            public int? Id { get; set; }
            public byte[]? Thumbnail { get; set; }
            public string? Name { get; set; }
            public string? Description { get; set; }
            public int? BedNum { get; set; }
            public int? MaxNum { get; set; }
            public bool? IsFull { get; set; }
            public float? Price { get; set; }
            public int? Area { get; set; }
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public DateTime? CreatedAt { get; set; }

            [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
            public DateTime? UpdatedAt { get; set; }
            public DateTime? DeletedAt { get; set; }
      }
}
