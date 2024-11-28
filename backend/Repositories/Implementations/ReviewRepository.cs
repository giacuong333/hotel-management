using backend.Database;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Repositories.Interfaces;

namespace Repositories.Implementations
{
      public class ReviewRepository : IReviewRepository
      {
        protected readonly DatabaseContext _context;
        private readonly DbSet<ReviewModel> _dbSet;

        public ReviewRepository(DatabaseContext context)
        {
            _context = context;
            _dbSet = context.Set<ReviewModel>();
        }
        public async Task CreateAsync(ReviewModel review)
        {
            await _dbSet.AddAsync(review);
        }
        public async Task DeleteAsync(object id)
        {
            ReviewModel entity = await _dbSet.FindAsync(id);
            if (entity != null)
            {
                var deletedAtProperty = typeof(ReviewModel).GetProperty("DeletedAt");
                if (deletedAtProperty != null && deletedAtProperty.PropertyType == typeof(DateTime?))
                {
                    deletedAtProperty.SetValue(entity, DateTime.UtcNow);
                    _context.Entry(entity).State = EntityState.Modified;
                }
                else
                {
                    _context.Remove(entity);
                }
            }
        }

        public async Task<IEnumerable<ReviewModel>> GetAllAsync()
        {
            return await _context.Review.Where(r => r.DeletedAt == null)
                      .Include(r => r.Users).Include(r => r.Rooms)
                      .ToListAsync();
        }

        public async Task<ReviewModel> GetByIdAsync(object id)
        {
          return  await  _dbSet.Include(r => r.Users).Include(r => r.Rooms).FirstOrDefaultAsync(r => r.Id ==(int) id);
        }

       

    }
}