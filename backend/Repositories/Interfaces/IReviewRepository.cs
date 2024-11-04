using backend.Models;
using Interfaces;

namespace backend.Repositories.Interfaces
{
    public interface IReviewRepository
    {
        Task<IEnumerable<ReviewModel>> GetAllAsync();
        Task<ReviewModel> GetByIdAsync(object id);
        Task DeleteAsync(object id);
     

    }
}
