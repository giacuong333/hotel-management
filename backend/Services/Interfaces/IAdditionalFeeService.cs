using Interfaces;

public interface IAdditionalFeeService
{
    Task<IEnumerable<AdditionalFeeModel>> GetAdditionalFeesByReceiptId(int receiptId);
    Task CreateAdditionalFee(AdditionalFeeModel additionalFee);
    Task UpdateAdditionalFee(AdditionalFeeModel additionalFee, int receiptId);
    Task DeleteAdditionalFeeById(int receiptId, int additionalFeeId);
    Task DeleteAdditionalFees(ICollection<AdditionalFeeModel> additionalFeeIds);
}