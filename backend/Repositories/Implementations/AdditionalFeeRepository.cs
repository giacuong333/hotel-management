using backend.Database;
using Microsoft.EntityFrameworkCore;
using Repositories.Implementations;

public class AdditionalFeeRepository(DatabaseContext context) : GenericRepository<AdditionalFeeModel>(context), IAdditionalFeeRepository
{
    public async Task<IEnumerable<AdditionalFeeModel>> GetAdditionalFeesByReceiptId(int receiptId)
    {
        var receipt = await _context.Receipt
            .Include(r => r.AdditionalFees)
            .FirstOrDefaultAsync(r => r.Id == receiptId);

        return receipt?.AdditionalFees ?? Enumerable.Empty<AdditionalFeeModel>();
    }

    public async Task CreateAdditionalFee(AdditionalFeeModel additionalFee)
    {
        await CreateAsync(additionalFee);
    }

    public async Task UpdateAdditionalFee(AdditionalFeeModel additionalFee, int receiptId)
    {
        var receipt = await _context.Receipt.FindAsync(receiptId);
        if (receipt != null && additionalFee.Id.HasValue)
        {
            var existingFee = receipt.AdditionalFees?
                .FirstOrDefault(f => f.Id == additionalFee.Id);

            if (existingFee != null)
            {
                existingFee.Name = additionalFee.Name;
                existingFee.Price = additionalFee.Price;

                receipt.UpdatedAt = DateTime.Now;

                _context.Receipt.Update(receipt);
            }
        }
    }

    public async Task DeleteAdditionalFeeById(int receiptId, int additionalFeeId)
    {
        var additionalFee = await _context.AdditionalFee.FirstOrDefaultAsync(a => a.Id == additionalFeeId && a.ReceiptId == receiptId);
        if (additionalFee != null)
        {
            await DeleteAsync(additionalFeeId);
        }
    }

    public async Task DeleteAdditionalFees(List<int> additionalFeeIds)
    {

        foreach (var additionalFeeId in additionalFeeIds)
        {
            var additionalFeeFromDatabase = await GetByIdAsync(additionalFeeId);
            if (additionalFeeFromDatabase != null)
            {
                await DeleteAsync(additionalFeeId);
            }
        }
    }
}