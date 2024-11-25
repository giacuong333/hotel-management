using backend.Database;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Implementations;
using Repositories.Interfaces;

public class FeedBackRepository(DatabaseContext context) : GenericRepository<FeedBackModel>(context), IFeedBackRepository{
    public async Task<IEnumerable<object>> GetListFeedBacks()
    {
        return await GetListFeedBacks();
    }
    public async Task<FeedBackModel> GetFeedBack(int id)
    {
        return await GetByIdAsync(id);
    }
    public async Task<FeedBackModel> DeleteFeedBack(int id)
    {
        await DeleteAsync(id);
        return null;
    }
    public async Task DeleteAllFeedBacks(List<int> feedBackIds)
    {
        await DeleteAllFeedBacks(feedBackIds);
    }
}