var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

const int maxLength = 1_000_000;

app.MapGet("/GetWeatherForecastV1", () =>
{
    var forecast = new object[maxLength];
    for (int i = 0; i < forecast.Length; i++)
    {
        forecast[i] =  new {
            Date = DateTime.Now.AddDays(i),
            temperatureC = Random.Shared.Next(-20, 55),
        };
    }

    return forecast;
}).WithName("GetWeatherForecastV1");

app.MapGet("/GetWeatherForecastV2", () =>
{
    var forecast = Enumerable.Range(1, maxLength).Select(index =>
            new
            {
                Date = DateTime.Now.AddDays(index),
                temperatureC = Random.Shared.Next(-20, 55),
            })
        .ToArray();
    return forecast;
}).WithName("GetWeatherForecastV2");

app.Run();