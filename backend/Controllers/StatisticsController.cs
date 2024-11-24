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
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsService _statisticsService;
        private readonly ILogger<DashboardController> _logger;

        public StatisticsController(IStatisticsService statisticsService, ILogger<DashboardController> logger)
        {
            _statisticsService = statisticsService;
            _logger = logger;
        }

     
        // [GET] /statistics/pie
        [HttpGet("pie")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<BookingModel>>> GetDataPieAsync(DateTime? start,DateTime? end)
        {
       
            try
            {
                var dataPie = await _statisticsService.GetDataPieAsync(start, end);
                return Ok(dataPie);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred.");
                return StatusCode(500, "Internal server error");
            }
        }
        // [GET] /statistics/pie
        [HttpGet("bar")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<BookingModel>>> GetDataBarCustomerAsync(DateTime? start, DateTime? end)
        {

            try
            {
                var dataPie = await _statisticsService.GetDataPieCustomerAsync(start, end);
                return Ok(dataPie);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred.");
                return StatusCode(500, "Internal server error");
            }
        }
        // [GET] /statistics/line
        [HttpGet("line")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<BookingModel>>> GetDataLineRevenueAsync(DateTime? start, DateTime? end)
        {
       
            try
            {
                var dataLine = await _statisticsService.GetRevenueByDateTimeAsync(start, end);
              

                return Ok(dataLine);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "An error occurred.");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
