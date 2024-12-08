using backend.Database;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Repositories.Implementations
{
    public class ReceiptRepository(DatabaseContext context) : GenericRepository<ReceiptModel>(context), IReceiptRepository
    {
        public async Task<IEnumerable<object>> GetReceiptsAsync()
        {

            var receipts = await _context.Receipt
                .Where(r => r.DeletedAt == null)
                .Select(r => new
                {
                    r.Id,
                    r.BookingId,
                    r.DiscountId,
                    r.Total,
                    r.CreatedAt,
                    r.UpdatedAt,
                    r.DeletedAt,
                    Booking = r.Booking != null ? new
                    {
                        r.Booking!.Id,
                        r.Booking!.CustomerName,
                        r.Booking!.CustomerEmail,
                        r.Booking!.CustomerPhoneNumber,
                        Customer = r.Booking.Customer != null ? new
                        {
                            r.Booking.Customer!.Id,
                            r.Booking.Customer.Name,
                            r.Booking.Customer.Email,
                            r.Booking.Customer.PhoneNumber,
                            Room = r.Booking.Room != null ? new
                            {
                                r.Booking!.Room!.Id,
                                r.Booking!.Room!.Name,
                                r.Booking!.Room!.Price,
                                r.Booking!.Room!.Type,
                            } : null
                        } : null,
                        ServiceUsage = r.Booking!.ServiceUsage!.Select(s => new
                        {
                            s.Id,
                            Service = s.Service != null ? new
                            {
                                s.Service!.Id,
                                s.Service.Name,
                                s.Service.Price,
                            } : null
                        }).ToList(),
                    } : null,
                    Discount = r.Discount != null ? new
                    {
                        r.Discount!.Id,
                        r.Discount.Name,
                        r.Discount.Value
                    } : null,
                }).ToListAsync();

            return receipts;
        }

        public async Task<object> GetReceiptsByIdAsync(int receiptId)
        {

            var receipts = await _context.Receipt
                .Where(r => r.DeletedAt == null && r.Id == receiptId)
                .Select(r => new
                {
                    r.Id,
                    r.BookingId,
                    r.DiscountId,
                    r.Total,
                    r.CreatedAt,
                    r.UpdatedAt,
                    r.DeletedAt,
                    Booking = r.Booking != null ? new
                    {
                        r.Booking!.Id,
                        r.Booking.CheckIn,
                        r.Booking.CheckOut,
                        r.Booking!.CustomerName,
                        r.Booking!.CustomerEmail,
                        r.Booking!.CustomerPhoneNumber,
                        Customer = r.Booking.Customer != null ? new
                        {
                            r.Booking.Customer!.Id,
                            r.Booking.Customer.Name,
                            r.Booking.Customer.Email,
                            r.Booking.Customer.PhoneNumber,
                        } : null,
                        ServiceUsage = r.Booking.ServiceUsage!.Select(s => new
                        {
                            s.Id,
                            s.Quantity,
                            Service = s.Service != null ? new
                            {
                                s.Service!.Id,
                                s.Service.Name,
                                s.Service.Price,
                            } : null
                        }).ToList(),
                        Room = r.Booking.Room != null ? new
                        {
                            r.Booking.Room!.Id,
                            r.Booking.Room!.Name,
                            r.Booking.Room!.Price,
                            r.Booking.Room!.Type,
                            r.Booking.Room!.BedNum,
                            r.Booking.Room!.Area,
                        } : null
                    } : null,
                    Discount = r.Discount != null ? new
                    {
                        r.Discount!.Id,
                        r.Discount.Name,
                        r.Discount.Value
                    } : null,
                }).FirstOrDefaultAsync();

            return receipts;
        }

        public async Task<ReceiptModel> GetReceiptByIdAsync(int id)
        {
            return await GetByIdAsync(id);
        }

        public async Task DeleteReceiptByIdAsync(int id)
        {
            await DeleteAsync(id);
        }

        public async Task DeleteReceiptsAsync(ICollection<ReceiptModel> receiptIds)
        {
            foreach (ReceiptModel receipt in receiptIds)
            {
                var receiptFromDatabase = await GetByIdAsync(receipt.Id);
                if (receiptFromDatabase != null)
                {
                    await DeleteAsync(receiptFromDatabase.Id);
                    _context.Receipt.Update(receiptFromDatabase);
                }
            }
        }

        public async Task<object> GetReceiptByBookingIdAsync(int bookingId)
        {
            var receipts = await _context.Receipt
                .Where(r => r.DeletedAt == null && r.BookingId == bookingId)
                .Select(r => new
                {
                    r.Id,
                    r.BookingId,
                    r.DiscountId,
                    r.Total,
                    r.CreatedAt,
                    r.UpdatedAt,
                    r.DeletedAt,
                    Booking = r.Booking == null ? null : new
                    {
                        r.Booking!.Id,
                        r.Booking.CheckIn,
                        r.Booking.CheckOut,
                        Customer = new
                        {
                            r.Booking.Customer!.Id,
                            r.Booking.Customer.Name,
                            r.Booking.Customer.Email,
                            r.Booking.Customer.PhoneNumber,
                        },
                        ServiceUsage = r.Booking.ServiceUsage == null ? null : r.Booking.ServiceUsage!.Select(s => new
                        {
                            s.Id,
                            s.Quantity,
                            Service = s.Service == null ? null : new
                            {
                                s.Service!.Id,
                                s.Service.Name,
                                s.Service.Price,
                            }
                        }).ToList(),
                        Room = r.Booking.Room == null ? null : new
                        {
                            r.Booking.Room!.Id,
                            r.Booking.Room!.Name,
                            r.Booking.Room!.Price,
                            r.Booking.Room!.Type,
                            r.Booking.Room!.BedNum,
                            r.Booking.Room!.Area,
                        }
                    },
                    Discount = r.Discount == null ? null : new
                    {
                        r.Discount!.Id,
                        r.Discount.Name,
                        r.Discount.Value
                    },
                }).FirstOrDefaultAsync();

            return receipts;
        }

        public async Task CreateReceiptAsync(ReceiptModel receipt)
        {
            if (receipt == null)
            {
                throw new ArgumentNullException(nameof(receipt), "Receipt cannot be null.");
            }

            try
            {
                await _context.Receipt.AddAsync(receipt);
            }
            catch (Exception ex)
            {
                // Log lỗi (nếu cần) và rethrow để xử lý bên ngoài
                Console.WriteLine($"Error while creating receipt: {ex.Message}");
                throw;
            }
        }
    }
}