using Interfaces;

public interface IAdditionalFeeRepository : IGenericRepository<AdditionalFeeModel>
{
    Task<IEnumerable<AdditionalFeeModel>> GetAdditionalFeesByReceiptId(int receiptId);
    Task CreateAdditionalFee(AdditionalFeeModel additionalFee);
    Task UpdateAdditionalFee(AdditionalFeeModel additionalFee, int receiptId);
    Task DeleteAdditionalFeeById(int receiptId, int additionalFeeId);
    Task DeleteAdditionalFees(List<int> additionalFeeIds);
}