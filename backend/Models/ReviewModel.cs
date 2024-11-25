using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class ReviewModel
    {
        public ReviewModel() { }
        public ReviewModel(int? id,int userId,int roomId, string? comment,int? status,DateTime? createdAt, DateTime? deletedAt)
        {
            this.Id = id;
            this.UserId = userId;
            this.RoomId = roomId;
            this.Comment = comment;
            this.Status = status;
            this.DeletedAt = deletedAt;
            this.CreatedAt = createdAt;
        }
        [Key]
        public int? Id { get; set; }
        [ForeignKey("Users")]
        public int? UserId { get; set; }
        [ForeignKey("Rooms")]
        public int? RoomId { get; set; }
        public string? Comment { get; set; }

        public int? Status { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        public virtual UserModel? Users { get; set; }
        public virtual RoomModel? Rooms { get; set; }

    }
}
