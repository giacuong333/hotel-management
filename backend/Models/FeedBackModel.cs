using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class FeedBackModel
    {
        public FeedBackModel() { }

        public FeedBackModel(int id, int userId, int roomId, string description, DateTime createdAt)
        {
            Id = id;
            UserId = userId;
            RoomId = roomId;
            Description = description;
            CreatedAt = createdAt;
        }

        [Key]
        public int Id { get; set; } // Non-nullable Id
        public int UserId { get; set; }
        public int RoomId { get; set; }
        public string Description { get; set; } // Made Description non-nullable
        public DateTime? CreatedAt { get; set; }

        public UserModel User { get; set; }
        public RoomModel Room { get; set; }
    }
}
