using BusinessCardManagement.Application.Context;
using BusinessCardManagement.Core.Interfeces;

namespace BusinessCardManagement.Application.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    protected ApplicationDbContext _context;

    public Repository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<T>> AddRange(List<T> entities)
    {
        await _context.Set<T>().AddRangeAsync(entities);
        return entities;
    }

    public T Remove(T entity)
    {
        _context.Remove(entity);
        return entity;
    }
}
