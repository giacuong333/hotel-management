using backend.Models;
using Interfaces;

namespace backend.Repositories.Interfaces
{
    public interface IReceiptRepository
    {
        Task<IEnumerable<object>> GetReceiptsAsync();
        Task<ReceiptModel> GetReceiptByIdAsync(int id);
        Task<object> GetReceiptsByIdAsync(int receiptId);
        Task DeleteReceiptByIdAsync(int id);
        Task DeleteReceiptsAsync(ICollection<ReceiptModel> receiptIds);
    }
}
