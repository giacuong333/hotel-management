using backend.Models;
using backend.Repositories.Interfaces;
using Repositories.Interfaces;

public class ReviewService : IReviewService
{
    private readonly IUnitOfWork _unitOfWork;


    public ReviewService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;

    }
    public async Task CreateReviewAsync(ReviewModel review)
    {
       await _unitOfWork.Reviews.CreateAsync(review);
        await _unitOfWork.CompleteAsync();

    }



    public async Task DeleteReviewAsync(object id)
    {
        await _unitOfWork.Reviews.DeleteAsync(id);
        await _unitOfWork.CompleteAsync();
    }

    public async Task<ReviewModel> GetReviewByIdAsync(object id)
    {
        return await _unitOfWork.Reviews.GetByIdAsync(id);
    }

    public async Task<IEnumerable<ReviewModel>> GetReviewsAsync()
    {
        return await _unitOfWork.Reviews.GetAllAsync();
    }



}
