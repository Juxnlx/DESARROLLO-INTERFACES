using TresEnRayaSignalR.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Agregar SignalR
builder.Services.AddSignalR();

// Configurar CORS para permitir conexiones desde React Native
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.WithOrigins("https://ycexvm4-anonymous-8081.exp.direct", "http://localhost:8081", "http://192.168.0.29:8081")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
    });
});

var app = builder.Build();

// Usar CORS
app.UseCors("AllowAll");

// Ruta de prueba
app.MapGet("/", () => "SignalR Server para Tres en Raya está funcionando!");

// Mapear el Hub de SignalR
app.MapHub<PartidaHub>("/partidahub");

app.Run();