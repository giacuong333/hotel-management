using backend.Models;
using Interfaces ;

public interface IDiscountService
{
    Task<IEnumerable<DiscountModel>> GetListActiveDiscounts();

    Task<IEnumerable<DiscountModel>> GetListDiscounts();
    Task<DiscountModel> GetDiscount(int id);
    Task<DiscountModel> CreateDiscount(DiscountModel discount);
    Task<DiscountModel> UpdateDiscount(int id, DiscountModel discount);
    Task<DiscountModel> DeleteDiscount(int id);
    Task DeleteAllDiscounts( List<int> discountIds);
}
