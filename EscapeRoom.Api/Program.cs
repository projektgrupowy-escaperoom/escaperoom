var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/api/game/info", () =>
{
    return Results.Ok(new
    {
        name = "Escape Room",
        description = "Rozwiązuj zagadki i wydostań się z pokoju!",
        version = "1.0",
        status = "Działa"
    });
})
.WithName("GetGameInfo");

app.Run();