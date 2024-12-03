using backend.Models;
public class FeedBackService(IUnitOfWork unitOfWork) : IFeedBackService{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    public async Task<IEnumerable<object>> GetListFeedBacks()
    {
        return await _unitOfWork.FeedBacks.GetListFeedBacks();
    }

    public async Task<object> GetFeedBack(int id)
    {
        return await _unitOfWork.FeedBacks.GetFeedBack(id);
    }
    public async Task<object> DeleteFeedBack(int id)
    {
        var feedBack = await _unitOfWork.FeedBacks.GetFeedBack(id) ;
        if (feedBack == null)
        {
            return null;
        }
        await _unitOfWork.FeedBacks.DeleteFeedBack(id);
        await _unitOfWork.CompleteAsync();
        return feedBack;
    }

    public async Task DeleteAllFeedBacks(List<int> feedBackIds)
    {
        await _unitOfWork.FeedBacks.DeleteAllFeedBacks(feedBackIds);
        await _unitOfWork.CompleteAsync();
    }
}