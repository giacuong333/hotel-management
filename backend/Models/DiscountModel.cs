namespace backend.Models
{
    public class DiscountModel
    {
        public DiscountModel() { }
        public DiscountModel(int id, string name, decimal value, bool status, DateTime? startAt, DateTime? endAt)
        {
            this.Id = id;
            this.Name = name;
            this.Value = value;
            this.Status = status;
            this.StartAt = startAt;
            this.EndAt = endAt;
        }

        public int Id { get; set; } // Non-nullable Id
        public string Name { get; set; }
        public decimal Value { get; set; } // Use decimal for financial data

        public bool Status { get; set; } // Nullable bool may be avoided
        public DateTime? StartAt { get; set; }
        public DateTime? EndAt { get; set; }
    }
}
