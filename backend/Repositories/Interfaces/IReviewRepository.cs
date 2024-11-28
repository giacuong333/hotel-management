using backend.Models;
using Interfaces;

namespace backend.Repositories.Interfaces
{
    public interface IReviewRepository
    {
        Task<IEnumerable<ReviewModel>> GetAllAsync();
        Task<IEnumerable<object>> GetAllByRoomIdAsync(int id);

        Task<ReviewModel> GetByIdAsync(object id);
        Task DeleteAsync(object id);
        Task CreateAsync(ReviewModel review);



    }
}
