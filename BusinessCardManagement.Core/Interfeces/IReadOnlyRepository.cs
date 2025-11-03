using System.Linq.Expressions;

namespace BusinessCardManagement.Core.Interfeces;

public interface IReadOnlyRepository<T> where T : class
{
    Task<T?> GetFirstOrDefault(Expression<Func<T, bool>> predicate, string[]? includes = null);

    IQueryable<T> GetAll(string[]? includes = null);
}
