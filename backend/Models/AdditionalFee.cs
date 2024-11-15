using backend.Models;

public class AdditionalFeeModel
{
    public int? Id { get; set; }
    public int? ReceiptId { get; set; }
    public string? Name { get; set; }
    public float? Price { get; set; }

    // Navigation property for the relationship with Receipt
    public ReceiptModel? Receipt { get; set; }
}
