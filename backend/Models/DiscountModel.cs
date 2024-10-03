namespace backend.Models
{
    public class DiscountModel
    {
        public DiscountModel() { }
        public DiscountModel(int? id, string? name, float? value, bool? status, DateTime? startAt, DateTime? endAt)
        {
            this.Id = id;
            this.Name = name;
            this.Value = value;
            this.Status = status;
            this.StartAt = startAt;
            this.EndAt = endAt;
        }

        public int? Id { get; set; }
        public string? Name { get; set; }
        public float? Value { get; set; }

        public bool? Status { get; set; }

        public DateTime? StartAt { get; set; }
        public DateTime? EndAt{ get; set;}
    }
}

