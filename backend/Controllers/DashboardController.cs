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
using System.Collections.Generic;
using System;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;
        private readonly ILogger<DashboardController> _logger;

        public DashboardController(IDashboardService dashboardService, ILogger<DashboardController> logger)
        {
            _dashboardService = dashboardService;
            _logger = logger;
        }

        // [GET] /dashboard/availablerooms
        [HttpGet("availablerooms")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<RoomModel>>> GetAvailableRoomsAsync()
        {
            try
            {
                var availableRooms = await _dashboardService.GetAvailableRoomsAsync();

                if (!availableRooms.Any())
                {
                    return NotFound(new { message = "No available rooms found." });
                }

                return Ok(availableRooms);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred while getting available rooms.");
                return StatusCode(500, "Internal server error");
            }
        }

        // [GET] /dashboard/bookingdetails
        [HttpGet("bookingdetails")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<object>>> GetBookingDetailsAsync()
        {
            try
            {
                var bookingdetails = await _dashboardService.GetBookingDetailsAsync();

                if (!bookingdetails.Any())
                {
                    return NotFound(new { message = "No available Bookings found." });
                }

                return Ok(bookingdetails);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred.");
                return StatusCode(500, "Internal server error");
            }
        }

        // [GET] /dashboard/bookingsbymonth
        [HttpGet("bookingsbymonth")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<BookingModel>>> GetBookingsByMonthAsync()
        {
            try
            {
                List<int> listBooking= new List<int>();
                for (int month = 1; month <= 12; month++)
                {
                    var bookingDetails = await _dashboardService.GetBookingsByMonthAsync(month.ToString());

                    if (!bookingDetails.Any())
                    {
                        listBooking.Add(0);
                     
                    }
                    else
                    {
                        var quanlity = bookingDetails.Count();
                        listBooking.Add(quanlity);
                    }
                }

                return Ok(listBooking);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred.");
                return StatusCode(500, "Internal server error");
            }
        }
        // [GET] /dashboard/cancellations
        [HttpGet("cancellations")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<BookingModel>>> GetCancellationsAsync()
        {
            try
            {
                var cancellations = await _dashboardService.GetCancellationsAsync();

                if (!cancellations.Any())
                {
                    return NotFound(new { message = "No available cancellations found." });
                }

                return Ok(cancellations);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred.");
                return StatusCode(500, "Internal server error");
            }
        }
        // [GET] /dashboard/PendingPayments
        [HttpGet("pendingpayments")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<BookingModel>>> GetPendingPaymentsAsync()
        {
            try
            {
                var pendingpayments = await _dashboardService.GetPendingPaymentsAsync();

                if (!pendingpayments.Any())
                {
                    return NotFound(new { message = "No available PendingPayments found." });
                }

                return Ok(pendingpayments);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred.");
                return StatusCode(500, "Internal server error");
            }
        }
        // [GET] /dashboard/TodayCheckouts
        [HttpGet("TodayCheckouts")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<BookingModel>>> GetTodayCheckoutsAsync()
        {
            try
            {
                var todayCheckouts = await _dashboardService.GetTodayCheckoutsAsync();

                if (!todayCheckouts.Any())
                {
                    return NotFound(new { message = "No available TodayCheckouts found." });
                }

                return Ok(todayCheckouts);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred.");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
