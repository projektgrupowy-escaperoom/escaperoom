namespace EscapeRoom.Api.DTOs;
// EPIC 1 US-01 TASK-02: Dane formularza rejestracji
public record RegisterRequest(string? Username, string? Email, string? Password, string? ConfirmPassword);