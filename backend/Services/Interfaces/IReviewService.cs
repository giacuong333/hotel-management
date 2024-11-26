
using backend.Models;

public interface IReviewService
{
      Task<IEnumerable<ReviewModel>> GetReviewsAsync();
    Task<ReviewModel> GetReviewByIdAsync(object id);
      Task DeleteReviewAsync(object id);
    Task CreateReviewAsync(ReviewModel review);


}