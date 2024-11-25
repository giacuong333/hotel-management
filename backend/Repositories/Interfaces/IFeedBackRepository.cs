using backend.Models;
using Interfaces;

namespace Repositories.Interfaces
{
    public interface IFeedBackRepository : IGenericRepository<FeedBackModel>
    {
        Task<IEnumerable<object>> GetListFeedBacks();
        Task<FeedBackModel> GetFeedBack(int id);
       
        Task<FeedBackModel> DeleteFeedBack(int id);
        Task DeleteAllFeedBacks( List<int> feedBackIds);
    }
}