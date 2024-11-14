using RecipieAPI.Data;
using RecipieAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace RecipieAPI.Services;

public class Customer_IngredientService
{
    private readonly AppDbContext _context;
    public Customer_IngredientService(AppDbContext db)
    {
        _context = db;
    }

    public async Task<List<CustomerIngredient>> getallAsync(string userEmail)
    {
        int c_id = _context.Customers.FirstOrDefault(c => c.Email == userEmail)?.Id ?? 0;
        return await _context.CustomerIngredients
            .Where(ci => ci.CustomerId == c_id)
            .Include(ci => ci.Ingredient)
            .Include(i => i.Unit)
            .ToListAsync();
    } 
}
