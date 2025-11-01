using System.ComponentModel.DataAnnotations;

namespace BusinessCardManagement.Core.Models;

public class Gender
{
    [Key]
    public string GenderCode { get; set; } = null!;

    [Required, MaxLength(6)]
    public string GenderName { get; set; } = null!;
}
