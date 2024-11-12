using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class ServiceModel
    {
        public ServiceModel() { }
        public ServiceModel(int? id, string? name, float? price, byte? status, DateTime? createdAt, DateTime? updatedAt, DateTime? deletedAt)
        {
            Id = id;
            Name = name;
            Price = price;
            Status = status;
            DeletedAt = deletedAt;
            UpdatedAt = updatedAt;
            CreatedAt = createdAt;
        }
        [Key]
        public int? Id { get; set; }

        public string? Name { get; set; }
        public float? Price { get; set; }
        public byte? Status { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime? CreatedAt { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }


    }
}
