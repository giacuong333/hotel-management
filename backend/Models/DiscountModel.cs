namespace backend.Models
{
    public class DiscountModel
    {
        public DiscountModel() { }
        public DiscountModel(int id, string name, decimal value, bool status, DateTime? startAt, DateTime? endAt)
        {
            Id = id;
            Name = name;
            Value = value;
            Status = status;
            StartAt = startAt;
            EndAt = endAt;
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal? Value { get; set; }
        public bool? Status { get; set; }
        public DateTime? StartAt { get; set; }
        public DateTime? EndAt { get; set; }
    }
}
