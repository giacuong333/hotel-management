using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;

public class ReceiptModel
{
    public ReceiptModel() { }

    [Key]
    public int Id { get; set; }
    public int? BookingId { get; set; }
    public int? DiscountId { get; set; }
    public float? Total { get; set; }
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime? CreatedAt { get; set; }
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; } = null;

    public virtual BookingModel? Booking { get; set; }
    public virtual DiscountModel? Discount { get; set; }
}
