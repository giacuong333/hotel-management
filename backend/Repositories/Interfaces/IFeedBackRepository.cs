using backend.Models;
using Interfaces;

namespace Repositories.Interfaces
{
    public interface IFeedBackRepository : IGenericRepository<FeedBackModel>
    {
        Task<IEnumerable<object>> GetListFeedBacks();
        Task<object> GetFeedBack(int id);
       
        Task<object> DeleteFeedBack(int id);
        Task DeleteAllFeedBacks( List<int> feedBackIds);
    }
}