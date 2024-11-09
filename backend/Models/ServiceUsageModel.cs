using backend.Models;

public class ServiceUsageModel
{
    public int? Id { get; set; }
    public int? BookingId { get; set; } // Nullable, as the booking can be optional
    public int? ServiceId { get; set; } // Nullable, as the service can be optional
    public int? Quantity { get; set; } // The quantity of service usage

    // Navigation properties for the relationships with Booking and Service
    public BookingModel? Booking { get; set; } // Navigation property to Booking
    public ServiceModel? Service { get; set; } // Navigation property to Service
}
