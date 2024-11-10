using Microsoft.EntityFrameworkCore;
using RecipieAPI.Data;
using RecipieAPI.Models;

namespace RecipieAPI.Services;

public class Ingredients
{
    private readonly AppDbContext _context;

    public Ingredients(AppDbContext db)
    {
        _context = db;
    }

    public async Task<List<Ingredient>> GetIngredientsAsync()
    {
        //return new List<Ingredient>();
        return await _context.Ingredients.ToListAsync();// ?? new();
    }
}
