
using backend.Models;
using System.Threading.Tasks;

public interface IStatisticsService
{
    Task<List<int>> GetDataPieAsync(DateTime? start, DateTime? end);
    Task<List<int>> GetDataPieCustomerAsync(DateTime? start, DateTime? end);


    Task<List<float>> GetRevenueByDateTimeAsync(DateTime? start, DateTime? end);




}