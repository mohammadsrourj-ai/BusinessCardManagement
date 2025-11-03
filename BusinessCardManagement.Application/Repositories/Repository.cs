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

    public async Task<T> Add(T entity)
    {
        await _context.Set<T>().AddAsync(entity);
        return entity;
    }

    public T Remove(T entity)
    {
        _context.Remove(entity);
        return entity;
    }
}
