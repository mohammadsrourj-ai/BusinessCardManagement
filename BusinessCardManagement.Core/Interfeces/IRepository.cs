namespace BusinessCardManagement.Core.Interfeces;

public interface IRepository<T> where T : class
{
    Task<List<T>> AddRange(List<T> entities);
    T Remove(T entity);
}
