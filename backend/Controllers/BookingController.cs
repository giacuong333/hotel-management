// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using System.Threading.Tasks;
// using backend.Models;
// using backend.Database;
// using Microsoft.Extensions.Logging;
// using System.Web.Helpers;
// using System.IdentityModel.Tokens.Jwt;
// using System.Text;
// using Microsoft.IdentityModel.Tokens;
// using System.Security.Claims;
// using Microsoft.AspNetCore.Authentication;
// using Microsoft.AspNetCore.Authorization;

// namespace backend.Controllers
// {
//       [Route("[controller]")]
//       [ApiController]
//       public class BookingController : ControllerBase
//       {
//             private readonly DatabaseContext _context;
//             private readonly ILogger<BookingController> _logger;
//             private readonly IConfiguration _configuration;

//             public BookingController(DatabaseContext context, ILogger<BookingController> logger, IConfiguration configuration)
//             {
//                   _context = context;
//                   _logger = logger;
//                   _configuration = configuration;
//             }

//             // [GET] /booking
//             [HttpGet]
//             [Produces("application/json")]
//             public async Task<ActionResult<IEnumerable<BookingModel>>> GetBookings()
//             {
//                   try
//                   {
//                         var bookings = await _context.Booking
//                               .Include(b => b.Room)
//                               .Include(b => b.Staff)
//                               .Include(b => b.Customer)
//                               .ToListAsync();

//                         if (bookings == null || bookings.Count == 0)
//                         {
//                               return NotFound(new { message = "Bookings not found" });
//                         }


//                         return Ok(bookings);
//                   }
//                   catch (Exception e)
//                   {
//                         Console.WriteLine(e);
//                         return StatusCode(500, new { message = "Internal server error" });
//                   }
//             }

//             // [GET] /booking/{id}
//             [HttpGet("{id}")]
//             [Produces("application/json")]
//             public async Task<ActionResult<IEnumerable<BookingModel>>> GetBookingById(int id)
//             {
//                   try
//                   {
//                         var booking = await _context.Booking.FindAsync(id);

//                         if (booking == null)
//                         {
//                               return NotFound(new { message = "Booking not found" });
//                         }

//                         return Ok(booking);
//                   }
//                   catch (Exception e)
//                   {
//                         Console.WriteLine(e);
//                         return StatusCode(500, new { message = "Internal server error" });
//                   }
//             }

//             // // [POST] /booking/checkin/{id}
//             // [HttpPost]
//             // public async Task<ActionResult<IEnumerable<BookingModel>>> CheckIn([FromBody] BookingModel payload)
//             // {

//             // }

//             // // [POST] /booking/checkout/{id}
//             // [HttpPost]
//             // public async Task<ActionResult<IEnumerable<BookingModel>>> CheckOut([FromBody] BookingModel payload)
//             // {

//             // }

//             // // [DELETE] /booking/{id}
//             // [HttpPost]
//             // public async Task<ActionResult<IEnumerable<BookingModel>>> SoftDeleteBooking([FromBody] BookingModel payload)
//             // {

//             // }
//       }
// }
