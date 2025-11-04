using BusinessCardManagement.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessCardManagement.Application.Context;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }
    public DbSet<BusinessCard> BusinessCards { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<BusinessCard>()
        .HasIndex(b => b.Email)
        .IsUnique();

        modelBuilder.Entity<BusinessCard>()
        .HasIndex(b => b.Phone)
        .IsUnique();
    }
}
