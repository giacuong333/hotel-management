using backend.Models;
using backend.Repositories.Interfaces;
using Repositories.Interfaces;

public class ReviewService : IReviewService
{
      private readonly IReviewRepository _reviewRepository;
   

      public ReviewService(IReviewRepository reviewRepository)
      {
        _reviewRepository = reviewRepository;
         
      }



      public async Task DeleteReviewAsync(object id)
      {
            await _reviewRepository.DeleteAsync(id);
      }

      public async Task<ReviewModel> GetReviewByIdAsync(object id)
      {
            return await _reviewRepository.GetByIdAsync(id);
      }

      public async Task<IEnumerable<ReviewModel>> GetReviewsAsync()
      {
            return await _reviewRepository.GetAllAsync();
      }

      public async Task SaveAsync()
      {
            await _reviewRepository.SaveAsync();
      }

}
