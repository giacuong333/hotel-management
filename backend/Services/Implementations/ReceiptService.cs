using backend.Models;

public class ReceiptService(IUnitOfWork unitOfWork) : IReceiptService
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<IEnumerable<ReceiptModel>> GetReceiptsAsync()
    {
        return await _unitOfWork.Receipts.GetReceiptsAsync();
    }
}
