using backend.Models;

namespace backend.Services.Interfaces
{
    public interface IVNPayService
    {
        string CreatePaymentUrl(HttpContext context, VNPayRequestModel model);
        VNPayResponseModel PaymentExecute(IQueryCollection collections);
    }
}
