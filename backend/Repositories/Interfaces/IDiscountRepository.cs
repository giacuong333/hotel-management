using backend.Models;
using Interfaces;

namespace Repositories.Interfaces
{
    public interface IDiscountRepository : IGenericRepository<DiscountModel>
    {
       Task<IEnumerable<DiscountModel>> GetListDiscounts();
        Task<IEnumerable<DiscountModel>> GetListActiveDiscounts();
        Task<DiscountModel> GetDiscount(int id);
       Task<DiscountModel> CreateDiscount(DiscountModel discount);
       Task<DiscountModel> UpdateDiscount(int id, DiscountModel discount);
       Task<DiscountModel> DeleteDiscount(int id);
       Task DeleteAllDiscounts( List<int> discountIds);
    }
}