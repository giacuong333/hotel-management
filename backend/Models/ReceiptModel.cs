using backend.Models;

public class ReceiptModel
{
    public int Id { get; set; } // Non-nullable primary key
    public int? StaffId { get; set; }
    public int? BookingId { get; set; }
    public int? DiscountId { get; set; }
    public float? Total { get; set; }
    public DateTime? CreatedAt { get; set; } = DateTime.Now; // Initialize only in the class
    public DateTime? UpdatedAt { get; set; } = DateTime.Now; // Initialize only in the class
    public DateTime? DeletedAt { get; set; } = null;

    // Navigation properties
    public UserModel? Staff { get; set; } // User who created the receipt (staff)
    public BookingModel? Booking { get; set; } // Associated booking
    public DiscountModel? Discount { get; set; } // Discount applied to the receipt
    public ICollection<AdditionalFeeModel> AdditionalFees { get; set; } = new List<AdditionalFeeModel>(); // Additional fees tied to the receipt
}
