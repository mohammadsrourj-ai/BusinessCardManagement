using BusinessCardManagement.Application.Services.DTOs;
using BusinessCardManagement.Core.Helpers;
using BusinessCardManagement.Core.Models;

namespace BusinessCardManagement.Application.Services;

public interface IBusinessCardsService
{
    Task<ResponseEnvelope<PagedResponse<BusinessCardDTO>>> GetAll(GetAllBusinessCardRequest request, PagedRequest pagedRequest);

    Task<ResponseEnvelope<bool>> AddRange(List<BusinessCard> businessCards);

    Task<ResponseEnvelope<bool>> Delete(int id);
}
