using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Implementations;
using Repositories.Interfaces;

public class DiscountRepository(DatabaseContext context) : GenericRepository<DiscountModel>(context), IDiscountRepository
{
    public async Task<IEnumerable<DiscountModel>> GetListDiscounts()
    {
        return await _context.Discount.ToListAsync();
    }
    public async Task<DiscountModel> GetDiscount(int id)
    {
        return await _context.Discount.FindAsync(id);
    }
    public async Task<DiscountModel> CreateDiscount(DiscountModel discount)
    {
        bool discountNameExist = await context.Discount.AnyAsync(d => d.Name == discount.Name);
        bool discountValueExist = await context.Discount.AnyAsync(d => d.Value == discount.Value);
        await _context.Discount.AddAsync(discount);
        await _context.SaveChangesAsync();
        return discount;
    }
    public async Task<DiscountModel> UpdateDiscount(int id, DiscountModel discount)
    {
        var existingDiscount = await _context.Discount.FindAsync(id);
        if (existingDiscount == null)
        {
            return null;
        }

        existingDiscount.Name = discount.Name;
        existingDiscount.Value = discount.Value;
        existingDiscount.Status = discount.Status;
        existingDiscount.StartAt = discount.StartAt;
        existingDiscount.EndAt = discount.EndAt;
        _context.Discount.Update(existingDiscount);
        await _context.SaveChangesAsync();
        return existingDiscount;
    }
    public async Task<DiscountModel> DeleteDiscount(int id)
    {
        var discount = await _context.Discount.FindAsync(id);
        if (discount == null)
        {
            return null;
        }

        _context.Discount.Remove(discount);
        await _context.SaveChangesAsync();
        return discount;
    }
    public async Task DeleteAllDiscounts(List<int> discountIds)
    {
        var discounts = await _context.Discount.Where(d => discountIds.Contains(d.Id)).ToListAsync();
        _context.Discount.RemoveRange(discounts);
        await _context.SaveChangesAsync();
    }
}