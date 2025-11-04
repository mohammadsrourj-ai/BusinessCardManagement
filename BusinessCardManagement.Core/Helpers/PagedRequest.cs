using System.ComponentModel.DataAnnotations;

namespace BusinessCardManagement.Core.Helpers;

public class PagedRequest
{
    [Required]
    public int PageNumber { get; set; } = 1;


    [Required]
    public int PageSize { get; set; } = 10;
}
