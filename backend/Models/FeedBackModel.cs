namespace backend.Models
{
    public class FeedBackModel
    {
        public FeedBackModel() { }

        public FeedBackModel(int id, int userId, int roomId, string description, DateTime createdAt)
        {
            this.Id = id;
            this.UserId = userId;
            this.RoomId = roomId;
            this.Description = description;
            this.CreatedAt = createdAt;
        }

        public int Id { get; set; } // Non-nullable Id
        public int UserId { get; set; }
        public int RoomId { get; set; }
        public string Description { get; set; } // Made Description non-nullable
        public DateTime CreatedAt { get; set; }

        public UserModel User { get; set; }
    }
}
