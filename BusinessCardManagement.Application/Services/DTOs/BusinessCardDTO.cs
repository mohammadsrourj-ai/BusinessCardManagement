using System.ComponentModel.DataAnnotations;

namespace BusinessCardManagement.Application.Services.DTOs;

public class BusinessCardDTO
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public DateTime DateOfBirth { get; set; }

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string? Photo { get; set; }

    public string Address { get; set; } = null!;
}
