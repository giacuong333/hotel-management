namespace backend.Models
{
    public class VNPayResponseModel
    {
        public bool Success { get; set; }
        public string PaymentMethod { get; set; }
        public string OrderDescription { get; set; }
        public string OrderId { get; set; }
        public string PaymentId { get; set; }
        public string TransactionId { get; set; }
        public string Token { get; set; }
        public string VnPayResponseCode { get; set; }
    }

    public class VNPayRequestModel
    {
        public int OrderId { get; set; }
        public string FullName { get; set; }
        public string Description { get; set; }
        public float Amount { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
