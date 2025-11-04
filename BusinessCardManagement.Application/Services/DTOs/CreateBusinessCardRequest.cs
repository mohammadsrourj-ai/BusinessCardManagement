using System.ComponentModel.DataAnnotations;

namespace BusinessCardManagement.Application.Services.DTOs;

public class CreateBusinessCardRequest
{
    [Required, MaxLength(100)]
    public string Name { get; set; } = null!;

    [Required, MaxLength(6)]
    public string Gender { get; set; } = null!;

    [Required]
    public DateTime DateOfBirth { get; set; }

    [Required, EmailAddress, MaxLength(100)]
    public string Email { get; set; } = null!;

    [Required, Phone, MaxLength(20)]
    public string Phone { get; set; } = null!;

    public string? Photo { get; set; }

    [Required, MaxLength(200)]
    public string Address { get; set; } = null!;
}
