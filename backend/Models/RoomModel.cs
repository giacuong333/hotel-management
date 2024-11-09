using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class RoomModel
{
      public RoomModel() { }

      [Key]
      public int Id { get; set; }
      public byte[]? Thumbnail { get; set; }
      public string? Name { get; set; }
      public string? Type { get; set; }
      public string? Description { get; set; }
      public int? BedNum { get; set; }
      public int? Status { get; set; }
      public float? Price { get; set; }
      public int? Area { get; set; }

      [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
      public DateTime? CreatedAt { get; set; }

      [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
      public DateTime? UpdatedAt { get; set; }

      public DateTime? DeletedAt { get; set; }
}
