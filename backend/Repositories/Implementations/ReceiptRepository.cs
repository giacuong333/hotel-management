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
                .Select(r => new
                {
                    r.Id,
                    r.BookingId,
                    r.DiscountId,
                    r.Total,
                    r.CreatedAt,
                    r.UpdatedAt,
                    r.DeletedAt,
                    Booking = new
                    {
                        r.Booking!.Id,
                        Customer = new
                        {
                            r.Booking.Customer!.Id,
                            r.Booking.Customer.Name,
                            r.Booking.Customer.Email,
                            r.Booking.Customer.PhoneNumber,
                            Room = new
                            {
                                r.Booking!.Room!.Id,
                                r.Booking!.Room!.Name,
                                r.Booking!.Room!.Price,
                                r.Booking!.Room!.Type,
                            }
                        },
                        ServiceUsage = r.Booking!.ServiceUsage!.Select(s => new
                        {
                            s.Id,
                            Service = new
                            {
                                s.Service!.Id,
                                s.Service.Name,
                                s.Service.Price,
                            }
                        }).ToList(),
                    },
                    Discount = new
                    {
                        r.Discount!.Id,
                        r.Discount.Name,
                        r.Discount.Value
                    },
                    AdditionalFees = r.AdditionalFees!.Select(af => new
                    {
                        af.Id,
                        af.Name,
                        af.Price,
                    }).ToList()
                }).Where(r => r.DeletedAt == null).ToListAsync();

            return receipts;
        }

        public async Task<object> GetReceiptsByIdAsync(int receiptId)
        {

            var receipts = await _context.Receipt
                .Select(r => new
                {
                    r.Id,
                    r.BookingId,
                    r.DiscountId,
                    r.Total,
                    r.CreatedAt,
                    r.UpdatedAt,
                    r.DeletedAt,
                    Booking = new
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
                        ServiceUsage = r.Booking.ServiceUsage.Select(s => new
                        {
                            s.Id,
                            s.Quantity,
                            Service = new
                            {
                                s.Service!.Id,
                                s.Service.Name,
                                s.Service.Price,
                            }
                        }).ToList(),
                        Room = new
                        {
                            r.Booking.Room!.Id,
                            r.Booking.Room!.Name,
                            r.Booking.Room!.Price,
                            r.Booking.Room!.Type,
                            r.Booking.Room!.BedNum,
                            r.Booking.Room!.Area,
                        }
                    },
                    Discount = new
                    {
                        r.Discount!.Id,
                        r.Discount.Name,
                        r.Discount.Value
                    },
                    AdditionalFees = r.AdditionalFees!.Select(af => new
                    {
                        af.Id,
                        af.Name,
                        af.Price,
                    }).ToList()
                }).Where(r => r.DeletedAt == null && r.Id == receiptId).FirstOrDefaultAsync();

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
                    Booking = new
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
                        ServiceUsage = r.Booking.ServiceUsage!.Select(s => new
                        {
                            s.Id,
                            s.Quantity,
                            Service = new
                            {
                                s.Service!.Id,
                                s.Service.Name,
                                s.Service.Price,
                            }
                        }).ToList(),
                        Room = new
                        {
                            r.Booking.Room!.Id,
                            r.Booking.Room!.Name,
                            r.Booking.Room!.Price,
                            r.Booking.Room!.Type,
                            r.Booking.Room!.BedNum,
                            r.Booking.Room!.Area,
                        }
                    },
                    Discount = new
                    {
                        r.Discount!.Id,
                        r.Discount.Name,
                        r.Discount.Value
                    },
                    AdditionalFees = r.AdditionalFees!.Select(af => new
                    {
                        af.Id,
                        af.Name,
                        af.Price,
                    }).ToList()
                }).FirstOrDefaultAsync();

            return receipts;
        }
    }
}