using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers
{
      [Route("[controller]")]
      [ApiController]
      public class RoomController(IRoomService roomService) : ControllerBase
      {
            private readonly IRoomService _roomService = roomService;

            // [GET] /room
            [HttpGet]
            [Produces("application/json")]
            public async Task<ActionResult<IEnumerable<RoomModel>>> GetRooms()
            {
                  try
                  {
                        var rooms = await _roomService.GetRoomsAsync();
                        if (rooms == null)
                              return NotFound("Rooms not found");

                        return Ok(rooms);
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

            // [GET] /room/{id}
            [HttpGet("{id}")]
            [Produces("application/json")]
            public async Task<ActionResult<RoomModel>> GetRoomById(int id)
            {
                  try
                  {
                        var room = await _roomService.GetRoomByIdAsync(id);
                        if (room == null)
                              return NotFound("Room not found");

                        return Ok(room);
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

            // [POST] /room
            [HttpPost]
            [Produces("application/json")]
            public async Task<ActionResult<IEnumerable<RoomModel>>> CreateRoom([FromBody] RoomModel request)
            {
                  try
                  {
                        if (!ModelState.IsValid)
                              return BadRequest(ModelState);

                        var room = new RoomModel
                        {
                              Name = request.Name,
                              Thumbnail = request.Thumbnail,
                              Type = request.Type,
                              Description = request.Description,
                              BedNum = request.BedNum,
                              Status = request.Status,
                              Price = request.Price,
                              Area = request.Area
                        };

                        await _roomService.CreateRoomAsync(room);
                        await _roomService.SaveAsync();

                        if (room.Id != 0)
                              return StatusCode(500, new { message = "Room ID not generated" });

                        var addedRoom = await _roomService.GetRoomByIdAsync((int)room.Id);
                        if (addedRoom == null)
                              return NotFound("Room not found.");

                        return StatusCode(201, new { message = "Room created successfully", room = addedRoom });
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

            // [PUT] /room/{id}
            [HttpPut("{id}")]
            [Produces("application/json")]
            public async Task<ActionResult<IEnumerable<RoomModel>>> EditRoom([FromBody] RoomModel payload, int id)
            {
                  try
                  {
                        if (!ModelState.IsValid)
                              return BadRequest(ModelState);

                        var room = await _roomService.GetRoomByIdAsync(id);
                        if (room == null)
                              return NotFound("Room not found");

                        room.Thumbnail = payload.Thumbnail;
                        room.Name = payload.Name;
                        room.Type = payload.Type;
                        room.Description = payload.Description;
                        room.BedNum = payload.BedNum;
                        room.Status = payload.Status;
                        room.Price = payload.Price;
                        room.Area = payload.Area;

                        await _roomService.UpdateRoomAsync(room);
                        await _roomService.SaveAsync();

                        return Ok(new { message = "Room edited successfully", room });
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

            // [DELETE] /room/{id}
            [HttpDelete("{id}")]
            [Produces("application/json")]
            public async Task<ActionResult<IEnumerable<RoomModel>>> DeleteRoomById(int id)
            {
                  try
                  {
                        var room = await _roomService.GetRoomByIdAsync(id);
                        if (room == null)
                              return NotFound("Room not found");

                        if (room.Status == 2)
                              return Conflict("The room is being booked.");

                        if (room.Status == 3)
                              return Conflict("The room is being stayed.");

                        await _roomService.DeleteRoomAsync(room.Id);
                        await _roomService.SaveAsync();

                        return Ok(new { message = "Room deleted successfully", room });
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

            // [DELETE] /room
            [HttpDelete]
            [Produces("application/json")]
            public async Task<ActionResult<IEnumerable<RoomModel>>> DeleteRoomsById([FromBody] List<RoomModel> request)
            {
                  try
                  {
                        if (request == null || request.Count == 0)
                              return BadRequest("No rooms provided for deletion.");

                        foreach (var data in request)
                        {
                              var room = await _roomService.GetRoomByIdAsync(data.Id);
                              if (room == null)
                                    return NotFound("Room not found.");

                              if (room.Status == 2)
                                    return Conflict("There's a room is being booked.");

                              if (room.Status == 3)
                                    return Conflict("There's a room is being stayed.");

                              await _roomService.DeleteRoomAsync(room.Id);
                        }

                        await _roomService.SaveAsync();

                        var updatedRooms = await _roomService.GetRoomsAsync();

                        return Ok(new { message = "Room deleted successfully", updatedRooms });
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
      }
}
