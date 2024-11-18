public interface IReceiptService
{
    Task<IEnumerable<object>> GetReceiptsAsync();
    Task<ReceiptModel> GetReceiptByIdAsync(int id);
    Task DeleteReceiptByIdAsync(int id);
    Task DeleteReceiptsAsync(ICollection<ReceiptModel> receiptIds);
    Task<object> GetReceiptsByIdAsync(int receiptId);
}