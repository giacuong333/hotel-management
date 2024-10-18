using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using backend.Models;
using backend.Database;
using Microsoft.Extensions.Logging;
using System.Web.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using System.Text.Json.Serialization;

namespace backend.Controllers
{
      [Route("[controller]")]
      [ApiController]
      public class BookingController(DatabaseContext context, ILogger<BookingController> logger, IConfiguration configuration) : ControllerBase
      {
            private readonly DatabaseContext _context = context;
            private readonly ILogger<BookingController> _logger = logger;
            private readonly IConfiguration _configuration = configuration;

            // [GET] /booking
            [HttpGet]
            public async Task<ActionResult<IEnumerable<BookingModel>>> GetBookings()
            {
                  try
                  {
                        var bookings = await _context.Booking
                              .Include(b => b.BookingDetails)
                                    .ThenInclude(bd => bd!.Room)
                              .Include(b => b.Customer)
                              .Include(b => b.StaffCheckIn)
                              .Include(b => b.StaffCheckOut)
                              .Where(b => b.DeletedAt == null)
                              .ToListAsync();
                        if (bookings == null || bookings.Count == 0)
                              return Util.NotFoundResponse("Bookings not found");

                        return Util.OkResponse(bookings);
                  }
                  catch (Exception e)
                  {
                        _logger.LogError(e.Message);
                        return Util.InternalServerErrorResponse("Internal server error");
                  }
            }

            // [GET] /booking/{id}
            [HttpGet("{id}")]
            public async Task<ActionResult<IEnumerable<BookingModel>>> GetBookingById(int id)
            {
                  try
                  {
                        var booking = await _context.Booking
                              .Include(b => b.BookingDetails)
                                    .ThenInclude(bd => bd!.Room)
                              .Include(b => b.Customer)
                              .Include(b => b.StaffCheckIn)
                              .Include(b => b.StaffCheckOut)
                              .Where(b => b.DeletedAt == null)
                              .FirstOrDefaultAsync(b => b.Id == id);
                        if (booking == null)
                        {
                              return Util.NotFoundResponse("Booking not found");
                        }

                        return Util.OkResponse(booking);
                  }
                  catch (Exception)
                  {
                        return Util.InternalServerErrorResponse("Internal server error");
                  }
            }

            // [DELETE] /booking/{id}
            [HttpDelete("{id}")]
            public async Task<ActionResult> DeleteBookingById(int id)
            {
                  try
                  {
                        var booking = await _context.Booking.FindAsync(id);
                        if (booking == null)
                        {
                              return Util.NotFoundResponse("Booking not found.");
                        }
                        if (booking.Status != 0)
                        {
                              return Util.ForbiddenResponse("Booking can not be deleted.");
                        }

                        booking.DeletedAt = DateTime.UtcNow;

                        _context.Booking.Update(booking);
                        await _context.SaveChangesAsync();

                        return Util.OkResponse(new { message = "Booking delete successfully." });
                  }
                  catch (Exception e)
                  {
                        _logger.LogError(e.Message);
                        return Util.InternalServerErrorResponse("Internal server error");
                  }
            }

            // [DELETE] /booking
            [HttpDelete]
            public async Task<ActionResult> DeleteBookings([FromBody] List<UserModel> bookings)
            {
                  try
                  {
                        if (bookings == null || bookings.Count == 0)
                        {
                              return Util.BadRequestResponse("No bookings provided for deletion.");
                        }
                        foreach (var booking in bookings)
                        {
                              var bookingFromDb = await _context.Booking.FindAsync(booking.Id);
                              if (bookingFromDb == null)
                              {
                                    return Util.NotFoundResponse("Booking not found");
                              }
                              if (bookingFromDb.Status != 0)
                              {
                                    return Util.ForbiddenResponse("These bookings can not be deleted");
                              }

                              bookingFromDb!.DeletedAt = DateTime.UtcNow;
                        }

                        await _context.SaveChangesAsync();

                        var updatedBookings = await _context.Booking
                              .Include(b => b.BookingDetails)
                                    .ThenInclude(bd => bd!.Room)
                              .Include(b => b.Customer)
                              .Include(b => b.StaffCheckIn)
                              .Include(b => b.StaffCheckOut)
                              .Where(b => b.DeletedAt == null)
                              .ToListAsync();

                        return Util.OkResponse(new { message = "Bookings deleted successfully.", updatedBookings });
                  }
                  catch (Exception e)
                  {
                        _logger.LogError(e.Message);
                        return Util.InternalServerErrorResponse("Internal server error");
                  }
            }

            // [PUT] /booking/status
            [HttpPut("{id}")]
            public async Task<ActionResult> ChangeStatus(int id, [FromBody] int statusCode)
            {
                  try
                  {
                        var booking = await _context.Booking.FindAsync(id);
                        if (booking == null)
                        {
                              return Util.NotFoundResponse("Booking not found");
                        }

                        booking.Status = statusCode;

                        _context.Booking.Update(booking);
                        await _context.SaveChangesAsync();

                        return Util.OkResponse("Status changed successfully");
                  }
                  catch (Exception e)
                  {
                        _logger.LogError(e, "Error while changing booking status");
                        return Util.InternalServerErrorResponse("Internal server error");
                  }
            }

            // [POST] /booking
            // [HttpPost]
            // public async Task<ActionResult<IEnumerable<BookingModel>>> AddBooking([FromBody] BookingModel payload)
            // {
            //       try
            //       {
            //             if (!ModelState.IsValid)
            //             {
            //                   return Util.BadRequestResponse("Data missing");
            //             }


            //       }
            //       catch (Exception e)
            //       {
            //             _logger.LogError(e, "Error while adding new booking");
            //             return Util.InternalServerErrorResponse("Intternal server error");
            //       }
            // }
      }
}
