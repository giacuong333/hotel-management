using backend.Models;

public class AdditionalFeeModel
{
    public AdditionalFeeModel() { }

    public int? Id { get; set; }
    public int? ReceiptId { get; set; }
    public string? Name { get; set; }
    public float? Price { get; set; }

    public ReceiptModel? Receipt { get; set; }
}
