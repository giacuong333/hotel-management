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

    public BookingModel? Booking { get; set; }
    public DiscountModel? Discount { get; set; }
    public IEnumerable<AdditionalFeeModel>? AdditionalFees { get; set; }
}
