using BusinessCardManagement.Application.Services;
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
}
