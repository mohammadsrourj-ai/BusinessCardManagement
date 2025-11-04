using BusinessCardManagement.Application.Services;
using BusinessCardManagement.Application.Services.DTOs;
using BusinessCardManagement.Core.Helpers;
using BusinessCardManagement.Core.Models;
using BusinessCardManagement.infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BusinessCardManagementAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BusinessCardsController : ControllerBase
{
    private readonly IBusinessCardsService _businessCardsService;

    public BusinessCardsController(IBusinessCardsService businessCardsService)
    {
        _businessCardsService = businessCardsService;
    }

    [HttpGet("All")]
    public async Task<IActionResult> GetAll([FromQuery] GetAllBusinessCardRequest request, [FromQuery] PagedRequest pagedRequest)
    {
        var result = await _businessCardsService.GetAll(request, pagedRequest);

        if (!result.IsSuccess)
            return BadRequest(result.Message);

        return Ok(result);
    }


    [HttpGet("Export")]
    public async Task<IActionResult> Export([FromQuery] FileType fileType, [FromQuery] GetAllBusinessCardRequest request, [FromQuery] PagedRequest pagedRequest)
    {
        try
        {
            var result = await _businessCardsService.GetAll(request, pagedRequest);

            if (!result.IsSuccess)
                return BadRequest(result.Message);

            if (result.ResponseData!.Items.Count == 0)
                return Ok(null);

            byte[] fileBytes;
            string contentType;
            string fileName;

            if (fileType == FileType.Csv)
            {
                fileBytes = FileParser.ToCsv(result.ResponseData!.Items);
                contentType = "text/csv";
                fileName = "businesscards.csv";
            }
            else
            {
                fileBytes = FileParser.ToXml(result.ResponseData!.Items);
                contentType = "application/xml";
                fileName = "businesscards.xml";
            }

            return File(fileBytes, contentType, fileName);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }



    [HttpPost()]
    public async Task<IActionResult> Create([FromQuery] CreateBusinessCardRequest requestCard)
    {
        List<BusinessCard> businessCards = new List<BusinessCard>();

        businessCards.Add(new BusinessCard
        {
            Name = requestCard.Name,
            DateOfBirth = requestCard.DateOfBirth,
            Email = requestCard.Email,
            Gender = requestCard.Gender,
            Phone = requestCard.Phone,
            Photo = requestCard.Photo,
            Address = requestCard.Address,
        });


        var result = await _businessCardsService.AddRange(businessCards);

        if (!result.IsSuccess)
            return BadRequest(result.Message);

        return Ok(result);
    }

    [HttpPost("Import")]
    public async Task<IActionResult> CreateFromFile(IFormFile file)
    {
        List<BusinessCard> businessCards = new List<BusinessCard>();

        var extension = Path.GetExtension(file.FileName).ToLower();
        if (extension == ".csv")
        {
            var records = FileParser.ParseCsv<CreateBusinessCardRequest>(file);
            businessCards.AddRange(records.Select(r => new BusinessCard
            {
                Name = r.Name,
                Gender = r.Gender,
                DateOfBirth = r.DateOfBirth,
                Email = r.Email,
                Phone = r.Phone,
                Photo = r.Photo,
                Address = r.Address
            }));
        }
        else if (extension == ".xml")
        {
            var records = FileParser.ParseXml<CreateBusinessCardRequest>(file);
            businessCards.AddRange(records.Select(r => new BusinessCard
            {
                Name = r.Name,
                Gender = r.Gender,
                DateOfBirth = r.DateOfBirth,
                Email = r.Email,
                Phone = r.Phone,
                Photo = r.Photo,
                Address = r.Address
            }));
        }
        else return BadRequest(ErrorMessages.UnsupportedFileType);

        var result = await _businessCardsService.AddRange(businessCards);

        if (!result.IsSuccess)
            return BadRequest(result.Message);

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _businessCardsService.Delete(id);

        if (!result.IsSuccess)
            return BadRequest(result.Message);

        return Ok(result);
    }
}
