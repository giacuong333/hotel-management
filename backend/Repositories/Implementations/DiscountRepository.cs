using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Implementations;
using Repositories.Interfaces;

public class DiscountRepository(DatabaseContext context) : GenericRepository<DiscountModel>(context), IDiscountRepository
{
 public async Task<IEnumerable<DiscountModel>> GetListDiscounts()
        {
            return await GetListDiscounts();
        }
public async Task<DiscountModel> GetDiscount(int id)
        {
            return await GetByIdAsync(id);
        }
public async Task<DiscountModel> CreateDiscount(DiscountModel discount)
        {
            await CreateAsync(discount);
            return discount;
        }
public async Task<DiscountModel> UpdateDiscount(int id, DiscountModel discount)
        {
            await UpdateAsync(discount);
            return discount;
        }
public async Task<DiscountModel> DeleteDiscount(int id)
        {
            await DeleteAsync(id);
            return null;
        }
public async Task DeleteAllDiscounts(List<int> discountIds)
        {
            await DeleteAllDiscounts(discountIds);
        }

    public async Task<IEnumerable<DiscountModel>> GetListActiveDiscounts()
    {
        var now = DateTime.Today;
        return await _context.Discount.Where(d => d.Status == true && d.EndAt >= now).ToListAsync();
    }
}