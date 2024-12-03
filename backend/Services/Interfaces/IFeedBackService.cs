using backend.Models;
using Interfaces ;

public interface IFeedBackService
{
    Task<IEnumerable<object>> GetListFeedBacks();
    Task<object> GetFeedBack(int id);
    Task<object> DeleteFeedBack(int id);
    Task DeleteAllFeedBacks( List<int> feedBackIds);
}
