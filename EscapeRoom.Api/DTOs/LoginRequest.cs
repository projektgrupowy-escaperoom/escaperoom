namespace EscapeRoom.Api.DTOs;

// EPIC 1 US-01 TASK-06: Implementacja logiki logowania
public record LoginRequest(string? Login, string? Password);