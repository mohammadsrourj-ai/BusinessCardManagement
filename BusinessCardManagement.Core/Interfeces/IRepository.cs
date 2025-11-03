namespace BusinessCardManagement.Core.Interfeces;

public interface IRepository<T> where T : class
{
    Task<T> Add(T entity);
    T Remove(T entity);
}
