using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using backend.Database;

public class BookingStatusUpdater(IServiceProvider serviceProvider, ILogger<BookingStatusUpdater> logger) : BackgroundService
{
      private readonly IServiceProvider _serviceProvider = serviceProvider;
      private readonly ILogger<BookingStatusUpdater> _logger = logger;

      protected override async Task ExecuteAsync(CancellationToken stoppingToken)
      {
            while (!stoppingToken.IsCancellationRequested)
            {
                  await UpdateBookingStatus();
                  // Check every minute
                  await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
      }

      protected async Task UpdateBookingStatus()
      {
            using (var scope = _serviceProvider.CreateAsyncScope())
            {
                  var context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
                  try
                  {
                        var currentDateTime = DateTime.UtcNow;

                        // Automatically check-in
                        var checkInBookings = await context.Booking.Where(b => b.CheckIn <= currentDateTime && b.Status == 1).ToListAsync();
                        foreach (var booking in checkInBookings)
                        {
                              booking.Status = 2; // Check-in
                              context.Booking.Update(booking);
                        }

                        // Automatically check-out
                        var checkOutBookings = await context.Booking.Where(b => b.CheckOut <= currentDateTime && b.Status == 2).ToListAsync();
                        foreach (var booking in checkOutBookings)
                        {
                              booking.Status = 3; // Check-out
                              context.Booking.Update(booking);
                        }

                        await context.SaveChangesAsync();
                  }
                  catch (Exception e)
                  {
                        _logger.LogError(e, "Error updating booking status.");
                  }
            }
      }
}