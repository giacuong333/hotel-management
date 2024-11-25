using backend.Models;
using Interfaces ;

public interface IFeedBackService
{
    Task<IEnumerable<object>> GetListFeedBacks();
    Task<FeedBackModel> GetFeedBack(int id);
    Task<FeedBackModel> DeleteFeedBack(int id);
    Task DeleteAllFeedBacks( List<int> feedBackIds);
}
