
public class AdditionalFeeService(IUnitOfWork unitOfWork) : IAdditionalFeeService
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<IEnumerable<AdditionalFeeModel>> GetAdditionalFeesByReceiptId(int receiptId)
    {
        return await _unitOfWork.AdditionalFees.GetAdditionalFeesByReceiptId(receiptId);
    }
    public async Task CreateAdditionalFee(AdditionalFeeModel additionalFee)
    {
        await _unitOfWork.AdditionalFees.CreateAdditionalFee(additionalFee);
        await _unitOfWork.CompleteAsync();
    }

    public async Task UpdateAdditionalFee(AdditionalFeeModel additionalFee, int receiptId)
    {
        await _unitOfWork.AdditionalFees.UpdateAdditionalFee(additionalFee, receiptId);
        await _unitOfWork.CompleteAsync();
    }

    public async Task DeleteAdditionalFeeById(int receiptId, int additionalFeeId)
    {
        await _unitOfWork.AdditionalFees.DeleteAdditionalFeeById(receiptId, additionalFeeId);
        await _unitOfWork.CompleteAsync();
    }

    public async Task DeleteAdditionalFees(List<int> additionalFeeIds)
    {
        await _unitOfWork.AdditionalFees.DeleteAdditionalFees(additionalFeeIds);
        await _unitOfWork.CompleteAsync();
    }

}