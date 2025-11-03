using BusinessCardManagement.Core.Interfeces;

namespace BusinessCardManagement.Application.Services;

public class BusinessCardsService : IBusinessCardsService
{

    private readonly IUnitOfWork _unitOfWork;

    public BusinessCardsService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
}
