using BusinessCardManagement.Application.Services.DTOs;
using BusinessCardManagement.Core.Helpers;
using BusinessCardManagement.Core.Interfeces;
using BusinessCardManagement.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessCardManagement.Application.Services;

public class BusinessCardsService : IBusinessCardsService
{

    private readonly IUnitOfWork _unitOfWork;

    public BusinessCardsService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<ResponseEnvelope<PagedResponse<BusinessCardDTO>>> GetAll(GetAllBusinessCardRequest request, PagedRequest pagedRequest)
    {
        try
        {
            var businessCardsQuery = _unitOfWork.ReadOnlyBusinessCards.GetAll()
             .Where(b =>
                 (request.Name == null || b.Name.Contains(request.Name)) &&
                 (request.DateOfBirth == null || b.DateOfBirth.Date == request.DateOfBirth.Value.Date) &&
                 (request.Gender == null || b.Gender.Contains(request.Gender)) &&
                 (request.Email == null || b.Email.Contains(request.Email)) &&
                 (request.Phone == null || b.Phone.Contains(request.Phone))
             );

            var totalCount = await businessCardsQuery.CountAsync();

            var businessCards = await businessCardsQuery
                .Select(b => new BusinessCardDTO
                {
                    Id = b.Id,
                    Phone = b.Phone,
                    Email = b.Email,
                    Gender = b.Gender,
                    DateOfBirth = b.DateOfBirth,
                    Name = b.Name,
                    Address = b.Address,
                    Photo = b.Photo
                })
                .OrderBy(c => c.Name)
                .Skip((pagedRequest.PageNumber - 1) * pagedRequest.PageSize)
                .Take(pagedRequest.PageSize)
                .ToListAsync();


            return new ResponseEnvelope<PagedResponse<BusinessCardDTO>>
            {
                IsSuccess = true,
                ResponseData = new PagedResponse<BusinessCardDTO>
                {
                    Items = businessCards,
                    PageNumber = pagedRequest.PageNumber,
                    PageSize = pagedRequest.PageSize,
                    TotalCount = totalCount
                }
            };
        }
        catch (Exception ex)
        {
            return new ResponseEnvelope<PagedResponse<BusinessCardDTO>>
            {
                Message = ex.Message,
                IsSuccess = false
            };
        }
    }

    public async Task<ResponseEnvelope<bool>> Delete(int id)
    {
        try
        {
            var businessCard = await _unitOfWork.ReadOnlyBusinessCards.GetFirstOrDefault(b => b.Id == id);
            if (businessCard == null)
                return new ResponseEnvelope<bool>
                {
                    Message = ErrorMessages.BusinessCardNotFound,
                    IsSuccess = false,
                    ResponseData = false
                };

            _unitOfWork.BusinessCards.Remove(businessCard);
            _unitOfWork.Complete();

            return new ResponseEnvelope<bool>
            {
                IsSuccess = true,
                ResponseData = true
            };
        }
        catch (Exception ex)
        {
            return new ResponseEnvelope<bool>
            {
                Message = ex.Message,
                IsSuccess = false,
                ResponseData = false
            };
        }
    }

    public async Task<ResponseEnvelope<bool>> AddRange(List<BusinessCard> businessCards)
    {
        var duplicateEmailsInList = businessCards
            .GroupBy(c => c.Email)
            .Where(g => g.Count() > 1)
            .SelectMany(g => g)
            .ToList();

        if (duplicateEmailsInList.Any())
        {
            return new ResponseEnvelope<bool>
            {
                IsSuccess = false,
                ResponseData = false,
                Message = ErrorMessages.DuplicateEmailsInRequest,
            };
        }

        var duplicatePhonesInList = businessCards
            .GroupBy(c => c.Phone)
            .Where(g => g.Count() > 1)
            .SelectMany(g => g)
            .ToList();

        if (duplicatePhonesInList.Any())
        {
            return new ResponseEnvelope<bool>
            {
                IsSuccess = false,
                ResponseData = false,
                Message = ErrorMessages.DuplicatePhonesInRequest,
            };
        }

        var emails = businessCards.Select(c => c.Email).ToList();
        var phones = businessCards.Select(c => c.Phone).ToList();

        var existingEmails = await _unitOfWork.ReadOnlyBusinessCards.GetAll()
            .Where(b => emails.Contains(b.Email))
            .Select(b => b.Email)
            .ToListAsync();

        if (existingEmails.Count != 0)
            return new ResponseEnvelope<bool>
            {
                Message = $"{ErrorMessages.ThisEmailIsUsedBefore} - [{string.Join(", ", existingEmails)}]",
                IsSuccess = false,
                ResponseData = false
            };

        var existingPhones = await _unitOfWork.ReadOnlyBusinessCards.GetAll()
            .Where(b => phones.Contains(b.Phone))
            .Select(b => b.Phone)
            .ToListAsync();

        if (existingPhones.Count != 0)
            return new ResponseEnvelope<bool>
            {
                Message = $"{ErrorMessages.ThisPhoneIsUsedBefore} - [ {string.Join(", ", existingPhones)} ]",
                IsSuccess = false,
                ResponseData = false
            };

        await _unitOfWork.BusinessCards.AddRange(businessCards);
        _unitOfWork.Complete();

        return new ResponseEnvelope<bool>
        {
            IsSuccess = true,
            ResponseData = true,
        };



    }
}
