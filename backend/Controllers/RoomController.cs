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
// using Microsoft.AspNetCore.Authentication.Cookies;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Http.HttpResults;

// namespace backend.Controllers
// {
//       [Route("[controller]")]
//       [ApiController]
//       public class RoomController : ControllerBase
//       {
//             private readonly DatabaseContext _context;
//             private readonly ILogger<RoomController> _logger;
//             private readonly IConfiguration _configuration;

//             public RoomController(DatabaseContext context, ILogger<RoomController> logger, IConfiguration configuration)
//             {
//                   _context = context;
//                   _logger = logger;
//                   _configuration = configuration;
//             }

//             // [GET] /room
//             [HttpGet]
//             [Produces("application/json")]
//             public async Task<ActionResult<IEnumerable<RoomModel>>> GetRooms()
//             {
//                   try
//                   {
//                         var rooms = await _context.Room.ToArrayAsync();

//                         if (rooms == null)
//                         {
//                               return NotFound(new { message = "Rooms not found" });
//                         }

//                         return Ok(new { data = rooms });
//                   }
//                   catch (Exception e)
//                   {
//                         Console.WriteLine(e);
//                         return StatusCode(500, "Internal server error");
//                   }
//             }

//             // [GET] /room/{id}
//             [HttpGet("{id}")]
//             [Produces("application/json")]
//             public async Task<ActionResult<IEnumerable<RoomModel>>> GetRoomById(int id)
//             {
//                   try
//                   {
//                         var room = await _context.Room.FindAsync(id);

//                         if (room == null)
//                         {
//                               return NotFound(new { message = "Room not found" });
//                         }

//                         return Ok(room);
//                   }
//                   catch (Exception e)
//                   {
//                         Console.Write(e);
//                         return StatusCode(500, "Internal server error");
//                   }
//             }

//             // [POST] /room
//             [HttpPost]
//             [Produces("application/json")]
//             public async Task<ActionResult<IEnumerable<RoomModel>>> CreateRoom([FromBody] RoomModel payload)
//             {
//                   try
//                   {
//                         if (!ModelState.IsValid)
//                         {
//                               return BadRequest(ModelState);
//                         }

//                         payload.IsFull = false;

//                         await _context.Room.AddAsync(payload);
//                         await _context.SaveChangesAsync();

//                         return StatusCode(201, new { message = "Room added successfully" });
//                   }
//                   catch (Exception e)
//                   {
//                         Console.WriteLine(e);
//                         return StatusCode(500, new { message = "Internal server error" });
//                   }
//             }

//             // [PUT] /room
//             [HttpPut]
//             [Produces("application/json")]
//             public async Task<ActionResult<IEnumerable<RoomModel>>> EditRoom([FromBody] RoomModel payload)
//             {
//                   try
//                   {
//                         if (!ModelState.IsValid)
//                         {
//                               return BadRequest(ModelState);
//                         }

//                         var room = await _context.Room.FindAsync(payload.Id);

//                         if (room == null)
//                         {
//                               return NotFound(new { message = "Room not found" });
//                         }

//                         room.Thumbnail = payload.Thumbnail;
//                         room.Name = payload.Name;
//                         room.Description = payload.Description;
//                         room.BedNum = payload.BedNum;
//                         room.MaxNum = payload.MaxNum;
//                         room.IsFull = payload.IsFull;
//                         room.Price = payload.Price;
//                         room.Area = payload.Area;
//                         room.UpdatedAt = DateTime.UtcNow;

//                         await _context.SaveChangesAsync();

//                         return StatusCode(200, new { message = "Room edited successfully" });
//                   }
//                   catch (Exception e)
//                   {
//                         Console.WriteLine(e);
//                         return StatusCode(500, new { message = "Internal server error" });
//                   }
//             }

//             // [DELETE] /room/{id}
//             [HttpDelete("{id}")]
//             [Produces("application/json")]
//             public async Task<ActionResult<IEnumerable<RoomModel>>> DeleteRoomById(int id)
//             {
//                   try
//                   {
//                         var room = await _context.Room.FindAsync(id);

//                         if (room == null)
//                         {
//                               return NotFound(new { message = "Room not found" });
//                         }

//                         _context.Room.Remove(room);

//                         await _context.SaveChangesAsync();

//                         return Ok(new { message = "Room deleted successfully" });
//                   }
//                   catch (Exception e)
//                   {
//                         Console.Write(e);
//                         return StatusCode(500, new { message = "Internal server error" });
//                   }
//             }
//       }
// }
