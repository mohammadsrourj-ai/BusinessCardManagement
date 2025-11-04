using BusinessCardManagement.Application.Services.DTOs;
using BusinessCardManagement.Core.Helpers;

namespace BusinessCardManagement.Application.Services;

public interface IBusinessCardsService
{
    Task<ResponseEnvelope<PagedResponse<BusinessCardDTO>>> GetAll(GetAllBusinessCardRequest request, PagedRequest pagedRequest);
}
