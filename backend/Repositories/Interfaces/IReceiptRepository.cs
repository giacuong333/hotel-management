using backend.Models;
using Interfaces;

namespace backend.Repositories.Interfaces
{
    public interface IReceiptRepository
    {
        Task<IEnumerable<ReceiptModel>> GetReceiptsAsync();
    }
}
