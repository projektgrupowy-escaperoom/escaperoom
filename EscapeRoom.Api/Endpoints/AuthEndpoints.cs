using EscapeRoom.Api.Data;
using EscapeRoom.Api.DTOs;
using EscapeRoom.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations; //do walidacji danych oraz definiowania reguł poprawności

namespace EscapeRoom.Api.Endpoints;

//EPIC 1 US-01 TASK-03: Implementacja logiki rejestracji
public static class AuthEndpoints
{
	public static void MapAuthEndpoints(this WebApplication app)
	{
		app.MapPost("/api/auth/register", async (RegisterRequest r, AppDb db) =>
		{
			var email = r.Email?.Trim().ToLower() ?? "";
			var password = r.Password ?? "";

			// EPIC 1 US-01 TASK-04: Walidacja i komunikaty rejestracji -> sprawdzanie poprawności danych wejściowych
			if (string.IsNullOrWhiteSpace(r.Username) || !new EmailAddressAttribute().IsValid(email))
				return Results.BadRequest(new { message = "Podaj nazwę użytkownika i poprawny e-mail." });
			if (password.Length < 8 || !password.Any(char.IsDigit))
				return Results.BadRequest(new { message = "Hasło musi mieć min. 8 znaków i cyfrę." });
			if (password != r.ConfirmPassword)
				return Results.BadRequest(new { message = "Hasła nie są identyczne." });

			// EPIC 1 US-01 TASK-04: Walidacja i komunikaty rejestracji -> sprawdzania czy podany e-mail jest już zajety
			if (await db.Users.AnyAsync(u => u.Email == email))
				return Results.Conflict(new { message = "Ten e-mail jest już zajęty." });

			//EPIC 1 US-01 TASK-03: Implementacja logiki rejestracji -> zapis użytkownika do bazy
			var user = new User { Username = r.Username.Trim(), Email = email };
			user.Password = new PasswordHasher<User>().HashPassword(user, password);
			db.Users.Add(user);
			await db.SaveChangesAsync();

			//EPIC 1 US-01 TASK-04: Walidacja i komunikaty rejestracji -> konto utworzone prawidłowo
			return Results.Ok(new { message = "Konto zostało utworzone!" });
		});

        // EPIC 1 US-01 TASK-06: Implementacja logiki logowania
        app.MapPost("/api/auth/login", async (LoginRequest r, AppDb db) =>
        {
            var login = r.Login?.Trim() ?? "";
            var password = r.Password ?? "";

            // EPIC 1 US-01 TASK-06: Implementacja logiki logowania -> sprawdzanie danych wejściowych
            if (string.IsNullOrWhiteSpace(login) || string.IsNullOrWhiteSpace(password))
                return Results.BadRequest(new { message = "Podaj login i hasło." });

            // EPIC 1 US-01 TASK-06: Implementacja logiki logowania -> wyszukiwanie użytkownika
            var normalizedLogin = login.ToLowerInvariant();

            var user = await db.Users.FirstOrDefaultAsync(u =>
                u.Email == normalizedLogin || u.Username.ToLower() == normalizedLogin);

            // EPIC 1 US-01 TASK-06: Implementacja logiki logowania -> weryfikacja hasła
            if (user == null)
                return Results.Json(
                    new { message = "Nieprawidłowy login lub hasło." },
                    statusCode: StatusCodes.Status401Unauthorized
                );

            var passwordHasher = new PasswordHasher<User>();
            var result = passwordHasher.VerifyHashedPassword(user, user.Password, password);

            if (result == PasswordVerificationResult.Failed)
               return Results.Json(
                new { message = "Nieprawidłowy login lub hasło." },
                statusCode: StatusCodes.Status401Unauthorized
            );

            // EPIC 1 US-01 TASK-06: Implementacja logiki logowania -> poprawne uwierzytelnienie
            return Results.Ok(new { message = "Zalogowano pomyślnie!" });
        });
    }
}