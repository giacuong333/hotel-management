using backend.Models;

public class DiscountService(IUnitOfWork unitOfWork) : IDiscountService{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<IEnumerable<DiscountModel>> GetListDiscounts()
    {
        return await _unitOfWork.Discounts.GetListDiscounts();
    }

    public async Task<DiscountModel> GetDiscount(int id)
    {
        return await _unitOfWork.Discounts.GetDiscount(id);
    }

    public async Task<DiscountModel> CreateDiscount(DiscountModel discount)
    {
        await _unitOfWork.Discounts.CreateDiscount(discount);
        await _unitOfWork.CompleteAsync();
        return discount;
    }

    public async Task<DiscountModel> UpdateDiscount(int id, DiscountModel discount)
    {
        await _unitOfWork.Discounts.UpdateDiscount(id, discount);
        await _unitOfWork.CompleteAsync();
        return discount;
    }

    public async Task<DiscountModel> DeleteDiscount(int id)
    {
        var discount = await _unitOfWork.Discounts.GetDiscount(id);
        if (discount == null)
        {
            return null;
        }
        await _unitOfWork.Discounts.DeleteDiscount(id);
        await _unitOfWork.CompleteAsync();
        return discount;
    }

    public async Task DeleteAllDiscounts(List<int> discountIds)
    {
        await _unitOfWork.Discounts.DeleteAllDiscounts(discountIds);
        await _unitOfWork.CompleteAsync();
    }
}