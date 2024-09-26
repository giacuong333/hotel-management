namespace backend.Models
{
    public class DiscountModel
    {
        public DiscountModel() { }
        public DiscountModel(int? id, string? name, int value)
        {
            this.Id = id;
            this.Name = name;
            this.Value = value;
        }

        public int? Id { get; set; }
        public string? Name { get; set; }
        public int Value { get; set; }
    }
}
