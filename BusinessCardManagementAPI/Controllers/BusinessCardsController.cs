using BusinessCardManagement.Application.Services;
using BusinessCardManagement.Application.Services.DTOs;
using BusinessCardManagement.Core.Helpers;
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
    public async Task<IActionResult> GetAllConnections([FromQuery] GetAllBusinessCardRequest request, [FromQuery] PagedRequest pagedRequest)
    {
        var result = await _businessCardsService.GetAll(request, pagedRequest);

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
