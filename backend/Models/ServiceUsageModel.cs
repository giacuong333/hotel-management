using System.ComponentModel.DataAnnotations;
using backend.Models;

public class ServiceUsageModel
{
    public ServiceUsageModel() { }

    [Key]
    public int Id { get; set; }
    public int? BookingId { get; set; }
    public int? ServiceId { get; set; }
    public int? Quantity { get; set; }

    public virtual BookingModel? Booking { get; set; }
    public virtual ServiceModel? Service { get; set; }
}
