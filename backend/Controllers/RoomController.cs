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
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;

namespace backend.Controllers
{
      [Route("[controller]")]
      [ApiController]
      public class RoomController(DatabaseContext context, ILogger<RoomController> logger, IConfiguration configuration) : ControllerBase
      {
            private readonly DatabaseContext _context = context;
            private readonly ILogger<RoomController> _logger = logger;
            private readonly IConfiguration _configuration = configuration;

            // [GET] /room
            [HttpGet]
            [Produces("application/json")]
            public async Task<ActionResult<IEnumerable<RoomModel>>> GetRooms()
            {
                  try
                  {
                        var rooms = await _context.Room.Where(r => r.DeletedAt == null).ToArrayAsync();

                        if (rooms == null)
                        {
                              return NotFound(new { message = "Rooms not found" });
                        }

                        return Util.OkResponse(rooms);
                  }
                  catch (Exception e)
                  {
                        Console.WriteLine(e);
                        return StatusCode(500, "Internal server error");
                  }
            }

            // [GET] /room/{id}
            [HttpGet("{id}")]
            [Produces("application/json")]
            public async Task<ActionResult<IEnumerable<RoomModel>>> GetRoomById(int id)
            {
                  try
                  {
                        var room = await _context.Room.FindAsync(id);

                        if (room == null)
                        {
                              return Util.NotFoundResponse("Room not found");
                        }

                        return Util.OkResponse(room);
                  }
                  catch (Exception e)
                  {
                        Console.Write(e);
                        return Util.InternalServerErrorResponse("Internal server error");
                  }
            }

            // [POST] /room
            [HttpPost]
            [Produces("application/json")]
            public async Task<ActionResult<IEnumerable<RoomModel>>> CreateRoom([FromBody] RoomModel payload)
            {
                  try
                  {
                        if (!ModelState.IsValid)
                        {
                              return BadRequest(ModelState);
                        }

                        var room = new RoomModel
                        {
                              Name = payload.Name,
                              Thumbnail = payload.Thumbnail,
                              Type = payload.Type,
                              Description = payload.Description,
                              BedNum = payload.BedNum,
                              Status = payload.Status,
                              Price = payload.Price,
                              Area = payload.Area,
                        };

                        await _context.Room.AddAsync(room);
                        await _context.SaveChangesAsync();

                        var addedRoom = await _context.Room.FindAsync(room.Id);

                        if (addedRoom == null)
                        {
                              Util.NotFoundResponse("Room not found.");
                        }

                        return Util.CreatedResponse(new { message = "Room created successfully", room });
                  }
                  catch (Exception e)
                  {
                        _logger.LogError(e.Message);
                        return Util.InternalServerErrorResponse("Internal server error");
                  }
            }

            // [PUT] /room/{id}
            [HttpPut("{id}")]
            [Produces("application/json")]
            public async Task<ActionResult<IEnumerable<RoomModel>>> EditRoom([FromBody] RoomModel payload, int id)
            {
                  try
                  {
                        if (!ModelState.IsValid)
                        {
                              return BadRequest(ModelState);
                        }

                        var room = await _context.Room.FindAsync(id);

                        if (room == null)
                        {
                              return Util.NotFoundResponse("Room not found");
                        }

                        room.Thumbnail = payload.Thumbnail;
                        room.Name = payload.Name;
                        room.Type = payload.Type;
                        room.Description = payload.Description;
                        room.BedNum = payload.BedNum;
                        room.Status = payload.Status;
                        room.Price = payload.Price;
                        room.Area = payload.Area;

                        _context.Room.Update(room);
                        await _context.SaveChangesAsync();

                        return Util.OkResponse(new { message = "Room edited successfully", room });
                  }
                  catch (Exception e)
                  {
                        Console.WriteLine(e);
                        return StatusCode(500, new { message = "Internal server error" });
                  }
            }

            // [DELETE] /room/{id}
            [HttpDelete("{id}")]
            [Produces("application/json")]
            public async Task<ActionResult<IEnumerable<RoomModel>>> DeleteRoomById(int id)
            {
                  try
                  {
                        var room = await _context.Room.FirstAsync(r => r.Id == id);

                        if (room == null)
                        {
                              return Util.NotFoundResponse("Room not found.");
                        }

                        if (room.Status == 2)
                        {
                              return Util.ConflictResponse("The room is being booked.");
                        }

                        if (room.Status == 3)
                        {
                              return Util.ConflictResponse("The room is being stayed.");
                        }

                        _context.Room.Remove(room);
                        await _context.SaveChangesAsync();

                        return Util.OkResponse(new { message = "Room deleted successfully", room });
                  }
                  catch (Exception e)
                  {
                        Console.Write(e);
                        return Util.InternalServerErrorResponse("Internal server error");
                  }
            }

            // [DELETE] /room
            [HttpDelete]
            [Produces("application/json")]
            public async Task<ActionResult<IEnumerable<RoomModel>>> DeleteRoomsById([FromBody] List<RoomModel> payload)
            {
                  try
                  {
                        if (payload == null || payload.Count == 0)
                        {
                              return BadRequest("No rooms provided for deletion.");
                        }

                        foreach (var data in payload)
                        {
                              var room = await _context.Room.FindAsync(data.Id);

                              if (room == null)
                              {
                                    return Util.NotFoundResponse("Room not found.");
                              }

                              if (room.Status == 2)
                              {
                                    return Util.ConflictResponse("There's a room is being booked.");
                              }

                              if (room.Status == 3)
                              {
                                    return Util.ConflictResponse("There's a room is being stayed.");
                              }

                              _context.Room.Remove(room);
                        }

                        await _context.SaveChangesAsync();

                        var updatedRooms = await _context.Room.ToListAsync();

                        return Util.OkResponse(new { message = "Room deleted successfully", updatedRooms });
                  }
                  catch (Exception e)
                  {
                        Console.Write(e);
                        return Util.InternalServerErrorResponse("Internal server error");
                  }
            }
      }
}
