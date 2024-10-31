namespace Interfaces
{
      public interface IGenericRepository<T> where T : class
      {
            Task<IEnumerable<T>> GetAllAsync();
            Task<T> GetByIdAsync(object id);
            Task CreateAsync(T entity);
            Task UpdateAsync(T entity);
            Task DeleteAsync(object id);
      }
}