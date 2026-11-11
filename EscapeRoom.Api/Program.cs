
using EscapeRoom.Api.Data;
using EscapeRoom.Api.Endpoints;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies; // TASK-07

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();

// EPIC 1 US-01 TASK-03: Implementacja logiki rejestracji -> połączenie z bazą SQLite
builder.Services.AddDbContext<AppDb>(o => o.UseSqlite("Data Source=escaperoom.db"));

// EPIC 1 US-01 TASK-07: Konfiguracja sesji użytkownika
builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "EscapeRoom.Session";
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        // EPIC 1 US-01 TASK-07: Ograniczenie przesyłania ciasteczka między witrynami
        options.Cookie.SameSite = SameSiteMode.Strict;

        options.ExpireTimeSpan = TimeSpan.FromHours(2);
        options.SlidingExpiration = true;

        options.Events.OnRedirectToLogin = context =>
        {
            context.Response.StatusCode = 401;
            return Task.CompletedTask;
        };

        options.Events.OnRedirectToAccessDenied = context =>
        {
            context.Response.StatusCode = 403;
            return Task.CompletedTask;
        };
    });

// EPIC 1 US-01 TASK-07: Autoryzacja użytkownika
builder.Services.AddAuthorization();

// Konfiguracja CORS -> pozwala frontendowi wysyłać dane do API
builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
    p.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod().AllowCredentials()));

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

// EPIC 1 US-01 TASK-07: Włączenie uwierzytelniania i autoryzacji
app.UseAuthentication();
app.UseAuthorization();

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
