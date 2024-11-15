using RecipieAPI.Data;
using RecipieAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace RecipieAPI.Services;
public class CustomerIngredientDetails
{
    public int ingredientId {get;set;} = 0;
    public string ingredientName {get;set;} = "";
    public string UnitName {get;set;} = "";
    public decimal Quantity {get;set;} = 0.001m;
}
public class CustomerIngredientAddDTO
{
    public string email { get; set; } = string.Empty;
    public int ingredient_id { get; set; } = 0;
    public int unit_id { get; set; } = 0;
    public int quantity { get; set; } = 0;
}
public class Customer_IngredientService
{
    private readonly AppDbContext _context;
    public Customer_IngredientService(AppDbContext db)
    {
        _context = db;
    }

    public List<CustomerIngredientDetails> getall(string userEmail)
    {
        int c_id = _context.Customers.FirstOrDefault(c => c.Email == userEmail)?.Id ?? 0;
        var query = from ci in _context.CustomerIngredients
            join i in _context.Ingredients on ci.IngredientId equals i.Id
            join u in _context.Units on ci.UnitId equals u.Id
            where ci.CustomerId == c_id
            select new CustomerIngredientDetails{
                ingredientId = i.Id,
                ingredientName = i.Name,
                UnitName = u.Symbol,
                Quantity = ci.Quantity ?? 0.00001m
            };

        var result = query.ToList();
        return result;
    } 

    public async Task<List<CustomerIngredientDetails>> addCustomerIngredientAsync(CustomerIngredientAddDTO dto)
    {
        int c_id = _context.Customers.FirstOrDefault(c => c.Email == dto.email)?.Id ?? 0;
        if (c_id != 0)
        {
            CustomerIngredient? currentCI = _context.CustomerIngredients.FirstOrDefault(ci => ci.IngredientId == dto.ingredient_id && ci.CustomerId == c_id);
            if (currentCI != null) 
            {
                currentCI.UnitId = dto.unit_id;
                currentCI.Quantity += dto.quantity;
            }
            else
            {
                CustomerIngredient ci = new CustomerIngredient();
                ci.IngredientId = dto.ingredient_id;
                ci.CustomerId = c_id;
                ci.Quantity = dto.quantity;
                _context.CustomerIngredients.Add(ci);
            }
            await _context.SaveChangesAsync();
        }
        return getall(dto.email);
    }
}
