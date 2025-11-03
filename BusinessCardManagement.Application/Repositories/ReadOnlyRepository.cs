using System.Linq.Expressions;
using BusinessCardManagement.Application.Context;
using BusinessCardManagement.Core.Interfeces;
using Microsoft.EntityFrameworkCore;

namespace BusinessCardManagement.Application.Repositories;

public class ReadOnlyRepository<T> : IReadOnlyRepository<T> where T : class
{
    protected ApplicationDbContext _context;

    public ReadOnlyRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<T?> GetFirstOrDefault(Expression<Func<T, bool>> predicate, string[]? includes = null)
    {
        IQueryable<T> query = _context.Set<T>().AsNoTracking();

        if (includes != null)
            foreach (var incluse in includes)
                query = query.Include(incluse);

        var result = await query.FirstOrDefaultAsync(predicate);

        return result;
    }

    public IQueryable<T> GetAll(string[]? includes = null)
    {
        IQueryable<T> query = _context.Set<T>().AsNoTracking();

        if (includes != null)
            foreach (var incluse in includes)
                query = query.Include(incluse);

        return query;
    }
}
