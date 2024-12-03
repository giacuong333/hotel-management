using backend.Models;

public class ReceiptModel
{
    public ReceiptModel() { }

    public int Id { get; set; }
    public int? BookingId { get; set; }
    public int? DiscountId { get; set; }
    public float? Total { get; set; }
    public DateTime? CreatedAt { get; set; } = DateTime.Now;
    public DateTime? UpdatedAt { get; set; } = DateTime.Now;
    public DateTime? DeletedAt { get; set; } = null;

    public virtual BookingModel? Booking { get; set; }
    public virtual DiscountModel? Discount { get; set; }
}
