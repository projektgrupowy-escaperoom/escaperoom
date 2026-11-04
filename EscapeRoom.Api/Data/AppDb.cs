using EscapeRoom.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace EscapeRoom.Api.Data;

//EPIC 1 US-01 TASK-03: Implementacja logiki rejestracji
public class AppDb(DbContextOptions<AppDb> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
}