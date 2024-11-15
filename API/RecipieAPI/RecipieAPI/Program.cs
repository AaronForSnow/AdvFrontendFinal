using RecipieAPI.Data;
using RecipieAPI.Controllers;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using RecipieAPI.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

// Add services to the container.
builder.Services.AddScoped<IngredientService>();
builder.Services.AddScoped<CustomerService>();
builder.Services.AddScoped<Customer_IngredientService>();
builder.Services.AddScoped<RecipieService>();
builder.Services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles); // Prevent circular dependencies
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration["db"]));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(
    p => p
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin()
);

app.UseHttpsRedirection();
//app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();
