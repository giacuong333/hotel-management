using backend.Database;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Repositories.Implementations
{
    public class ReceiptRepository(DatabaseContext context) : IReceiptRepository
    {
        protected readonly DatabaseContext _context = context;

        public async Task<IEnumerable<ReceiptModel>> GetReceiptsAsync()
        {
            return await _context.Receipt
                .Include(r => r.Staff)
                .Include(r => r.Booking)
                .Include(r => r.Discount)
                .ToListAsync();
        }
    }
}