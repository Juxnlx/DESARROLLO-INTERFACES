using SignalRChat.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddSignalR();

// ⬇️⬇️⬇️ AÑADIR CORS (OBLIGATORIO PARA REACT NATIVE) ⬇️⬇️⬇️
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactNative", policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .SetIsOriginAllowed((host) => true) // Permite cualquier origen
              .AllowCredentials(); // Obligatorio para SignalR
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// ⬇️⬇️⬇️ USAR CORS ⬇️⬇️⬇️
app.UseCors("AllowReactNative");

app.UseAuthorization();

app.MapRazorPages();
app.MapHub<ChatHub>("/chatHub");

app.Run();