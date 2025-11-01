using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessCardManagement.Core.Models;

public class BusinessCard
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; } = null!;

    [Required]
    [ForeignKey("Gender")]
    public string GenderCode { get; set; } = null!;

    public Gender Gender { get; set; } = null!;

    [Required]
    public DateTime DateOfBirth { get; set; }

    [Required, EmailAddress, MaxLength(100)]
    public string Email { get; set; } = null!;

    [Required, Phone, MaxLength(20)]
    public string Phone { get; set; } = null!;

    public byte[]? Photo { get; set; }

    [MaxLength(50)]
    public string? PhotoContentType { get; set; }

    [Required, MaxLength(200)]
    public string Address { get; set; } = null!;
}
