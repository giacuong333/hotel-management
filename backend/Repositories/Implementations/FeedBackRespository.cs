using backend.Database;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Repositories.Implementations;
using Repositories.Interfaces;

public class FeedBackRepository(DatabaseContext context) : GenericRepository<FeedBackModel>(context), IFeedBackRepository{
    public async Task<IEnumerable<object>> GetListFeedBacks()
    {
        return await _context.Feedback
            .Join(_context.User,
                feedback => feedback.UserId,
                user => user.Id,
                (feedback, user) => new { feedback, user })
            .Join(_context.Room,
                feedbackUser => feedbackUser.feedback.RoomId,
                room => room.Id,
                (feedbackUser, room) => new
                {
                    feedbackUser.feedback.Id,
                    feedbackUser.feedback.Description,
                    feedbackUser.feedback.CreatedAt,
                    UserName = feedbackUser.user.Name,
                    RoomName = room.Name
                })
            .ToListAsync();
    }
   public async Task<object> GetFeedBack(int id)
{
    var feedbackData = await _context.Feedback
        .Where(feedback => feedback.Id == id)
        .Join(_context.User,
            feedback => feedback.UserId,
            user => user.Id,
            (feedback, user) => new { feedback, user })
        .Join(_context.Room,
            feedbackUser => feedbackUser.feedback.RoomId,
            room => room.Id,
            (feedbackUser, room) => new 
            {
                feedbackUser.feedback.Id,
                feedbackUser.feedback.Description,
                feedbackUser.feedback.CreatedAt,
                UserName = feedbackUser.user.Name,
                RoomName = room.Name,
                RoomId = feedbackUser.feedback.RoomId
            })
        .FirstOrDefaultAsync();

    if (feedbackData == null)
    {
        return null;
    }

    return new 
    {
        feedbackData.Id,
        feedbackData.Description,
        feedbackData.CreatedAt,
        feedbackData.UserName,
        feedbackData.RoomName,
        feedbackData.RoomId
    };
}
    public async Task<object> DeleteFeedBack(int id)
    {
       var feedback = await context.Feedback.FindAsync(id);
                
                context.Feedback.Remove(feedback);
                await context.SaveChangesAsync();
                return feedback;
    }
    public async Task DeleteAllFeedBacks(List<int> feedBackIds)
    {
        var feedbacksToDelete = await context.Feedback
                    .Where(f => feedBackIds.Contains((int)f.Id))
                    .ToListAsync();

                
                context.Feedback.RemoveRange(feedbacksToDelete);
                await context.SaveChangesAsync();
    }
}