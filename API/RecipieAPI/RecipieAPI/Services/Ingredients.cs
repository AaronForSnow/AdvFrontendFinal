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

    public async Task<List<Ingredient>> AddIngredientAsync(Ingredient i) {
        await _context.Ingredients.AddAsync(i);
        await _context.SaveChangesAsync();
        return await _context.Ingredients.ToListAsync();
    }

    public async Task<List<Ingredient>> DeleteIngredientAsync(int id){
        Ingredient? i = _context.Ingredients.FirstOrDefault(i => i.Id == id);
        if (i != null){
            _context.Ingredients.Remove(i);
            await _context.SaveChangesAsync();
        }
        return await _context.Ingredients.ToListAsync();
    }
}
