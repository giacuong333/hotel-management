using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class ServiceModel
    {
        public ServiceModel() { }
        public ServiceModel(int? id, string? name,float? price,byte? status,DateTime? createdAt,DateTime? updatedAt, DateTime? deletedAt)
        {
            this.Id = id;
            this.Name = name;
            this.Price = price;
            this.Status = status;
      
            this.DeletedAt = deletedAt;
            this.UpdatedAt = updatedAt;
       
            this.CreatedAt = createdAt;
        }
        [Key]
        public int? Id { get; set; }

        public string? Name { get; set; }
        public float? Price { get; set; }
        public byte? Status { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }


    }
}
