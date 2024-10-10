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
                              .Where(b => b.DeletedAt == null)
                              .ToListAsync();

                        if (bookings == null || !bookings.Any())
                        {
                              return Util.NotFoundResponse("Bookings not found");
                        }

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
                        Console.WriteLine(id);
                        var booking = await _context.Booking.FindAsync(id);

                        if (booking == null)
                        {
                              return Util.NotFoundResponse("Booking not found.");
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
      }
}
