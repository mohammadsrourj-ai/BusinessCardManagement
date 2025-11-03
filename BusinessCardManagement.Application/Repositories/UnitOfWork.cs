using BusinessCardManagement.Application.Context;
using BusinessCardManagement.Core.Interfeces;
using BusinessCardManagement.Core.Models;

namespace BusinessCardManagement.Application.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;

    public IReadOnlyRepository<BusinessCard> ReadOnlyBusinessCards { get; private set; }

    public IRepository<BusinessCard> BusinessCards { get; private set; }

    public UnitOfWork(ApplicationDbContext context)
    {
        _context = context;

        this.ReadOnlyBusinessCards = new ReadOnlyRepository<BusinessCard>(_context);

        this.BusinessCards = new Repository<BusinessCard>(_context);

    }

    public int Complete()
    {
        return _context.SaveChanges();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
