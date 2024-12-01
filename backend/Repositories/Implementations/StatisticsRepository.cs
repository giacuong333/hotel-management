using backend.Database;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implementations
{
    public class StatisticsRepository : IStatisticsRepository
    {
        protected readonly DatabaseContext _context;
        private readonly DbSet<ReceiptModel> _dbSetReceipt;
        private readonly DbSet<BookingModel> _dbSetBooking;

        private readonly DbSet<UserModel> _dbSetUser;




        public StatisticsRepository(DatabaseContext context)
        {
            _context = context;
            _dbSetReceipt = context.Set<ReceiptModel>();
            _dbSetBooking = context.Set<BookingModel>();
            _dbSetUser = context.Set<UserModel>();


        }

        public async Task<IEnumerable<BookingModel>> GetCustomerBookingRetrysAsync(DateTime start, DateTime end)
        {
            var bookings = await _dbSetBooking
                              .Where(bk => bk.Status ==3 && bk.UpdatedAt >= start && bk.UpdatedAt <= end)
                              .ToListAsync();
                    

            var result = bookings
                .GroupBy(bk => bk.CustomerId)
                .Where(group => group.Count() > 1)
                .Select(group => group.First())
                .ToList();

            return result;

        }

        public async Task<IEnumerable<UserModel>> GetCustomersAsync(DateTime start, DateTime end)
        {
            return await _dbSetUser.Where(u => u.RoleId == 4 && u.DeletedAt == null).ToListAsync();
        }

        public async Task<IEnumerable<BookingModel>> GetBookingCanelsAsync(DateTime start, DateTime end)
        {


            return await _dbSetBooking
                .Where(bk => bk.UpdatedAt >= start && bk.UpdatedAt <= end && bk.Status==0)
                .ToListAsync();
        }

        public async Task<IEnumerable<BookingModel>> GetBookingSuccesssAsync(DateTime start, DateTime end)
        {


            return await _dbSetBooking
               .Where(bk => bk.UpdatedAt >= start && bk.UpdatedAt <= end && bk.Status != 0 && bk.DeletedAt== null)
               .ToListAsync();

        }

        public async Task<IEnumerable<ReceiptModel>> GetRevenueByDateTimeAsync(DateTime start, DateTime end)
        {
            return await _dbSetReceipt
           .Where(rc => rc.CreatedAt >= start && rc.CreatedAt <= end && rc.DeletedAt == null)
           .ToListAsync();
        }


    }
}