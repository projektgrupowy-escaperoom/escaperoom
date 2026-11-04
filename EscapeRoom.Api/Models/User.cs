namespace EscapeRoom.Api.Models;

// EPIC 1 US-01 TASK-01: Przygotowanie modelu użytkownika
public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = "";
    public string Email { get; set; } = "";
    public string Password { get; set; } = ""; // zapisane jako hash
}
