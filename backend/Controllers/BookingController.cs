using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
      [Route("[controller]")]
      [ApiController]
      public class BookingController(IBookingService bookingService) : ControllerBase
      {
            private readonly IBookingService _bookingService = bookingService;

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

                        if (booking.Status != 0 || booking.Status != 3)
                              return StatusCode(403, new { message = "You only delete the booking that is canceled or checked-out" });

                        booking.DeletedAt = DateTime.UtcNow;

                        await _bookingService.DeleteBookingAsync(id);
                        await _bookingService.SaveAsync();

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

                              if (bookingFromDb.Status != 0 || bookingFromDb.Status != 3)
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
                        var booking = await _bookingService.GetBookingByIdAsync((int)id);
                        if (booking == null)
                              return NotFound("Booking not found");

                        await _bookingService.ChangeStatusAsync(booking, statusCode);

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

            // [POST] /booking
            // [HttpPost]
            // public async Task<ActionResult<IEnumerable<BookingModel>>> CreateBooking([FromBody] BookingModel payload)
            // {
            //       using var transaction = await _context.Database.BeginTransactionAsync();
            //       try
            //       {
            //             if (!ModelState.IsValid)
            //             {
            //                   return Util.BadRequestResponse("Data missing");
            //             }

            //             const booking = await _context.Booking.FirstAsync(b => b.PhoneNumber == payload.PhoneNumber);

            //             await transaction.CommitAsync();
            //       }
            //       catch (Exception e)
            //       {
            //             await transaction.RollbackAsync();
            //             _logger.LogError(e, "Error while adding new booking");
            //             return Util.InternalServerErrorResponse("Intternal server error");
            //       }
            // }
      }
}
