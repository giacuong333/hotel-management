
public class ReceiptService(IUnitOfWork unitOfWork) : IReceiptService
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task DeleteReceiptByIdAsync(int id)
    {
        await _unitOfWork.Receipts.DeleteReceiptByIdAsync(id);
        await _unitOfWork.CompleteAsync();
    }

    public async Task DeleteReceiptsAsync(ICollection<ReceiptModel> receiptIds)
    {
        await _unitOfWork.Receipts.DeleteReceiptsAsync(receiptIds);
        await _unitOfWork.CompleteAsync();
    }

    public async Task<object> GetReceiptByBookingIdAsync(int bookingId)
    {
        return await _unitOfWork.Receipts.GetReceiptByBookingIdAsync(bookingId);
    }

    public async Task<ReceiptModel> GetReceiptByIdAsync(int id)
    {
        return await _unitOfWork.Receipts.GetReceiptByIdAsync(id);
    }

    public async Task<IEnumerable<object>> GetReceiptsAsync()
    {
        return await _unitOfWork.Receipts.GetReceiptsAsync();
    }

    public async Task<object> GetReceiptsByIdAsync(int receiptId)
    {
        return await _unitOfWork.Receipts.GetReceiptsByIdAsync(receiptId);
    }
}
