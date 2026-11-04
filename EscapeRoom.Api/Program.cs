using EscapeRoom.Api.Data;
using EscapeRoom.Api.Endpoints;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();

// EPIC 1 US-01 TASK-03: Implementacja logiki rejestracji -> połączenie z bazą SQLite
builder.Services.AddDbContext<AppDb>(o => o.UseSqlite("Data Source=escaperoom.db"));

// Konfiguracja CORS -> pozwala frontendowi wysyłać dane do API
builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
    p.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

// EPIC 1 US-01 TASK-03: Implementacja logiki rejestracji -> utworzenie bazy przy starcie
using (var scope = app.Services.CreateScope())
    scope.ServiceProvider.GetRequiredService<AppDb>().Database.EnsureCreated();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors();

app.MapGet("/api/game/info", () => Results.Ok(new
{
    name = "Escape Room",
    description = "Rozwiązuj zagadki i wydostań się z pokoju!",
    version = "1.0",
    status = "Działa"
}))
.WithName("GetGameInfo");

// EPIC 1 US-01 TASK-03: Implementacja logiki rejestracji -> podłączenie endpointu rejestracji
app.MapAuthEndpoints();

app.Run();