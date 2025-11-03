using BusinessCardManagement.Core.Models;

namespace BusinessCardManagement.Core.Interfeces;

public interface IUnitOfWork : IDisposable
{
    IReadOnlyRepository<BusinessCard> ReadOnlyBusinessCards { get; }

    IRepository<BusinessCard> BusinessCards { get; }

    int Complete();

}