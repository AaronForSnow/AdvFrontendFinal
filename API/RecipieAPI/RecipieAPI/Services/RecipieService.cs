using Microsoft.EntityFrameworkCore;
using RecipieAPI.Data;
using RecipieAPI.Models;

namespace RecipieAPI.Services;

public class RecipieMakerDTO
{
    public string recipie_name { get; set; } = "";
    public string discription { get; set; } = "";
    public string instructions { get; set; } = "";
    public List<int> ingredient_ids { get; set; } = new List<int>();
    public List<int> unit_ids { get; set; } = new List<int>();
    public List<int> quantities { get; set; } = new List<int>();
}
public class RecipieGiverDTO
{
    public int id { get; set; }
    public string recipie_name { get; set; } = "";
    public string discription { get; set; } = "";
    public string instructions { get; set; } = "";
    public List<Ingredient_Amount> ingredients { get; set; } = new ();
}
public class Ingredient_Amount
{
    public Ingredient ingredient { get; set; } = new Ingredient() ;
    public string unit { get; set; } = "";
    public decimal quantity { get; set; } = new decimal();
}
public class RecipieService
{
    private readonly AppDbContext _context;
    public RecipieService(AppDbContext db)
    {
        _context = db;
    }

    public async Task<List<RecipieGiverDTO>> GetAllRecipiesAsync()
    {
        List<RecipieGiverDTO> recipies = new List<RecipieGiverDTO>();
        List<Recipe> recipes = await _context.Recipes.ToListAsync();
        foreach (Recipe recipe in recipes) {
            RecipieGiverDTO rec = new RecipieGiverDTO();
            rec.id = recipe.Id;
            rec.recipie_name = recipe.Name;
            rec.discription = recipe.Description ?? "no descrption given";
            rec.instructions = recipe.Instructions ?? "no instructions given";
            foreach (RecipeIngredient recipieingredient in _context.RecipeIngredients.Where(ri => ri.RecipeId == recipe.Id).ToList())
            {
                Ingredient_Amount ingredientAmt = new Ingredient_Amount();
                ingredientAmt.unit = _context.Units.FirstOrDefault(u => u.Id == recipieingredient.UnitId)?.Symbol ?? "c";
                ingredientAmt.quantity = recipieingredient.Quantity;
                ingredientAmt.ingredient = _context.Ingredients.FirstOrDefault(i => i.Id == recipieingredient.IngredientId) ?? new Ingredient();
                ingredientAmt.ingredient.RecipeIngredients = new List<RecipeIngredient>() { };
                ingredientAmt.ingredient.CustomerIngredients = new List<CustomerIngredient>() { };
                rec.ingredients.Add(ingredientAmt);
            }

            recipies.Add(rec);
        }

        return recipies;
    }
}
