using Microsoft.AspNetCore.Mvc;
using backend.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using backend.Services.Interfaces;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookingController(IBookingService bookingService, IVNPayService vnpayService) : ControllerBase
    {
        private readonly IBookingService _bookingService = bookingService;
        private readonly IVNPayService _vnpayService = vnpayService;

        // [GET] /booking
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingModel>>> GetBookings()
        {
            try
            {
                var bookings = await _bookingService.GetBookingsAsync();
                if (bookings == null || !bookings.Any())
                    return NotFound("Bookings not found");

                return Ok(bookings);
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        private static int GetUserIdFromClaims(HttpContext httpContext)
        {
            var userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim != null)
                return int.Parse(userIdClaim!.Value);

            throw new UnauthorizedAccessException("User ID not found in claims.");
        }

        [HttpGet("customer_booking")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<BookingModel>>> GetAuthorizedBookings()
        {
            try
            {
                var userId = GetUserIdFromClaims(HttpContext);
                var bookings = await _bookingService.GetAuthorizedBookingsAsync(userId);
                if (bookings == null)
                    return NotFound("Bookings not found");

                return Ok(bookings);

            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        // [GET] /booking/customer_cancelled_booking
        [HttpGet("customer_cancelled_booking")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<BookingModel>>> GetAuthorizedCancalledBookings()
        {
            try
            {
                var userId = GetUserIdFromClaims(HttpContext);
                var bookings = await _bookingService.GetAuthorizedCancelledBookingsAsync(userId);
                if (bookings == null)
                    return NotFound("Cancelled Bookings not found");

                return Ok(bookings);

            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        // [GET] /booking/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<BookingModel>>> GetBookingById(int id)
        {
            try
            {
                var booking = await _bookingService.GetBookingByIdAsync(id);
                if (booking == null)
                    return NotFound("Booking not found");

                return Ok(booking);
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        // [DELETE] /booking/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBookingById(int id)
        {
            try
            {
                var booking = await _bookingService.GetBookingByIdAsync(id);
                if (booking == null)
                    return NotFound("Booking not found.");

                if (booking.Status != 0 && booking.Status != 3)
                    return StatusCode(403, new { message = "You only delete the booking that is canceled or checked-out" });

                // booking.DeletedAt = DateTime.UtcNow;

                await _bookingService.DeleteBookingAsync(id);

                return Ok("Booking delete successfully");
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        // [DELETE] /booking
        [HttpDelete]
        public async Task<ActionResult> DeleteBookings([FromBody] List<UserModel> bookings)
        {
            try
            {
                if (bookings == null || bookings.Count == 0)
                    return BadRequest("No bookings provided for deletion.");

                foreach (var booking in bookings)
                {
                    var bookingFromDb = await _bookingService.GetBookingByIdAsync(booking.Id);
                    if (bookingFromDb == null)
                        return NotFound("Booking not found");

                    // Canceled or Checked-out 
                    if (bookingFromDb.Status != 0 && bookingFromDb.Status != 3)
                        return StatusCode(403, new { message = "You only can delete bookings that is canceled or checked-out" });

                    await _bookingService.DeleteBookingAsync(booking.Id);
                }

                await _bookingService.SaveAsync();

                var updatedBookings = await _bookingService.GetBookingsAsync();

                return Ok(new { message = "Bookings deleted successfully.", updatedBookings });
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        // [PUT] /booking/status
        [HttpPut("status/{id}")]
        [Produces("application/json")]
        public async Task<ActionResult> ChangeStatus(int id, [FromBody] int statusCode)
        {
            try
            {
                var booking = await _bookingService.GetBookingByIdAsync(id);
                var staffId = GetUserIdFromClaims(HttpContext);

                if (booking == null)
                    return NotFound("Booking not found");

                if (statusCode == 2 && booking.CheckIn!.Value.Date != DateTime.Today.Date)
                    return Conflict("Your check-in time is not today.");

                await _bookingService.ChangeStatusAsync(booking, statusCode, staffId);

                return Ok("Status changed successfully");
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        // [GET] /booking/room/{roomId}
        [HttpGet("room/{roomId}")]
        public async Task<ActionResult<IEnumerable<BookingModel>>> GetBookingsByRoomIdAsync(int roomId)
        {
            try
            {
                var bookings = await _bookingService.GetBookingsByRoomIdAsync(roomId);

                return Ok(bookings);
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateBooking([FromBody] CreateBookingRequest request)
        {
            try
            {
                if (request == null || !ModelState.IsValid)
                {
                    return BadRequest("Invalid request data.");
                }

                var vnpayModel = new VNPayRequestModel
                {
                    Amount = request.Receipt.Total,
                    CreatedDate = DateTime.Now,
                    Description = $"Khách hàng {request.Booking.CustomerName ?? request.Booking.CustomerId.ToString()} thanh toán đơn hàng.",
                    OrderId = new Random().Next(1000, 10000)
                };

                //Redirect(_vnpayService.CreatePaymentUrl(HttpContext, vnpayModel));
                return Ok(_vnpayService.CreatePaymentUrl(HttpContext, vnpayModel));

                var booking = request.Booking;
                var services = request.Services;
                var receipt = request.Receipt;

                // Kiểm tra nếu booking null
                if (booking == null)
                {
                    return BadRequest("Booking information is missing.");
                }

                // Gọi phương thức xử lý logic để tạo booking
                await _bookingService.CreateBookingAsync(booking, services, receipt);

                return StatusCode(200, new { message = "Booking created successfully", booking });
            }
            catch (Exception ex)
            {
                // Ghi lại chi tiết lỗi để kiểm tra thêm
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, new { message = "Error creating booking", error = ex.Message });
            }
        }

        // Lớp dùng để nhận dữ liệu
        public class CreateBookingRequest
        {
            public BookingModel Booking { get; set; }
            public ServiceUsageModel[] Services { get; set; }
            public ReceiptModel Receipt { get; set; }
        }

        [Authorize]
        public IActionResult PaymentFail()
        {
            return null;
        }

        [Authorize]
        public IActionResult PaymentSuccess()
        {
            return null;
        }

        [HttpGet("proceed-payment/payment-callback")]
        [Produces("application/json")]
        public async Task<ActionResult> PaymentCallBack()
        {
            // Xử lý dữ liệu từ query params
            var response = _vnpayService.PaymentExecute(Request.Query);

            Console.WriteLine("Response: " + response);

            // Nếu response null hoặc mã phản hồi không phải "00", trả về lỗi
            if (response == null || response.VnPayResponseCode != "00")
            {
                var messageFail = $"VNPay payment error: {response?.VnPayResponseCode ?? "unknown"}";
                return BadRequest(new
                {
                    status = "fail",
                    message = messageFail,
                });
            }

            // Trả về thành công nếu mã phản hồi là "00"
            var messageSuccess = $"VNPay payment success: {response.VnPayResponseCode}";
            return Ok(new
            {
                status = "success",
                message = messageSuccess,
                data = response // Gửi thêm thông tin chi tiết nếu cần
            });
        }

    }
}
