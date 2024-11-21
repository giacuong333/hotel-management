using backend.Models;
using backend.Repositories.Interfaces;
using Repositories.Interfaces;
using System.Threading.Tasks;

public class StatisticsService : IStatisticsService
{
    private readonly IUnitOfWork _unitOfWork;


    public StatisticsService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;

    }



    public async Task<List<int>> GetDataPieAsync(DateTime? start, DateTime? end)
    {

        if (start == null || end == null)
        {
            start = new DateTime(DateTime.Now.Year, 1, 1);
            end = new DateTime(DateTime.Now.Year, 12, 31);
        }

        var receipts = await _unitOfWork.Statistics.GetReceiptsAsync(start.Value, end.Value);
        var receiptSuccesss = await _unitOfWork.Statistics.GetReceiptSuccesssAsync(start.Value, end.Value);

        List<int> pie = new List<int>();


        int recieptFails = receipts.Count() - receiptSuccesss.Count();
        pie.Add(receiptSuccesss.Count());
        pie.Add(recieptFails);
        return pie;
    }
    public async Task<List<int>> GetDataPieCustomerAsync(DateTime? start, DateTime? end)
    {

        if (start == null || end == null)
        {
            start = new DateTime(DateTime.Now.Year, 1, 1);
            end = new DateTime(DateTime.Now.Year, 12, 31);
        }

        var customers = await _unitOfWork.Statistics.GetCustomersAsync(start.Value, end.Value);
        var customerRetry = await _unitOfWork.Statistics.GetCustomerBookingRetrysAsync(start.Value, end.Value);

        List<int> pieCustomer = new List<int>();

        pieCustomer.Add(customers.Count());
        pieCustomer.Add(customerRetry.Count());
        return pieCustomer;
    }

    public async Task<List<float>> GetRevenueByDateTimeAsync(DateTime? start, DateTime? end)
    {
        List<float> dataLine = new List<float>();

        if (start == null || end == null)
        {
            int year = DateTime.Now.Year;
            for (int month = 1; month <= 12; month++)
            {
                var monthStart = new DateTime(year, month, 1);
                var monthEnd = monthStart.AddMonths(1).AddDays(-1); 
                var revenues = await _unitOfWork.Statistics.GetRevenueByDateTimeAsync(monthStart, monthEnd);
                var totalRevenue = revenues.Sum(rv=>rv.Total ?? 0);

                dataLine.Add(totalRevenue); 
            }
        }
        else
        {

            // TH1: Nếu start và end  cùng một tháng
            if (start.Value.Year == end.Value.Year && start.Value.Month == end.Value.Month)
            {
                DateTime currentDate = start.Value;
         

                while (currentDate <= end.Value)
                {
                   
                    DateTime startOfDay = currentDate.Date; 
                    DateTime endOfDay = currentDate.Date.AddDays(1).AddMilliseconds(-1);

                 
    
                    var dailyRevenues = await _unitOfWork.Statistics.GetRevenueByDateTimeAsync(startOfDay, endOfDay);
                    dataLine.Add(dailyRevenues.Sum(rv => rv.Total ?? 0));

          
                    currentDate = currentDate.AddDays(1);
                }
            }
            // TH 2: Nếu start và end  <= 1 year 
            else if ((end.Value.Year - start.Value.Year) * 12 + (end.Value.Month - start.Value.Month) < 12)
            {
                DateTime currentMonth = new DateTime(start.Value.Year, start.Value.Month, 1);
                DateTime endOfMonth = new DateTime(end.Value.Year, end.Value.Month, DateTime.DaysInMonth(end.Value.Year, end.Value.Month));

                while (currentMonth <= endOfMonth)
                {
                    DateTime monthEnd = new DateTime(currentMonth.Year, currentMonth.Month, DateTime.DaysInMonth(currentMonth.Year, currentMonth.Month));
                    var monthlyRevenues = await _unitOfWork.Statistics.GetRevenueByDateTimeAsync(currentMonth, monthEnd);
                    dataLine.Add(monthlyRevenues.Sum(rv => rv.Total ?? 0));
                    currentMonth = currentMonth.AddMonths(1);
                }
            }
            // TH3: Nếu start và end > 1 year
            else
            {
                DateTime currentYear = new DateTime(start.Value.Year, 1, 1);
                DateTime endOfYear = new DateTime(end.Value.Year, 12, 31);

                while (currentYear <= endOfYear)
                {
                    DateTime yearEnd = new DateTime(currentYear.Year, 12, 31);
                    var yearlyRevenues = await _unitOfWork.Statistics.GetRevenueByDateTimeAsync(currentYear, yearEnd);
                    dataLine.Add(yearlyRevenues.Sum(rv => rv.Total ?? 0));
                    currentYear = currentYear.AddYears(1);
                }
            }
        }

        return dataLine;
    }




}
