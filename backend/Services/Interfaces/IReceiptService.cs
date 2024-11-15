
using backend.Models;

public interface IReceiptService
{
    Task<IEnumerable<ReceiptModel>> GetReceiptsAsync();
}