public interface IReceiptService
{
    Task CreateReceiptAsync(ReceiptModel receipt);
    Task<IEnumerable<object>> GetReceiptsAsync();
    Task<ReceiptModel> GetReceiptByIdAsync(int id);
    Task DeleteReceiptByIdAsync(int id);
    Task DeleteReceiptsAsync(ICollection<ReceiptModel> receiptIds);
    Task<object> GetReceiptsByIdAsync(int receiptId);
    Task<object> GetReceiptByBookingIdAsync(int bookingId);
}