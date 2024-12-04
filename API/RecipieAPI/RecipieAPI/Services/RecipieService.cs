using Microsoft.AspNetCore.Components.Forms;
using Microsoft.EntityFrameworkCore;
using RecipieAPI.Data;
using RecipieAPI.Models;

namespace RecipieAPI.Services;

//public class RecipieMakerDTO
//{
//    public string recipie_name { get; set; } = "";
//    public string description { get; set; } = "";
//    public string instructions { get; set; } = "";
//    public List<int> ingredient_ids { get; set; } = new List<int>();
//    public List<int> unit_ids { get; set; } = new List<int>();
//    public List<int> quantities { get; set; } = new List<int>();
//}
public class RecipieGiverDTO
{
    public int id { get; set; }
    public string recipie_name { get; set; } = "";
    public string description { get; set; } = "";
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
            rec.description = recipe.Description ?? "no descrption given";
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
    public async Task<List<RecipieGiverDTO>> AddRecipieAsync(RecipieGiverDTO recipie)
    {
        int addedrecID = await addPlainRecipieAsync(recipie);
        await AddRecipieIngredientsAsync(recipie, addedrecID);

        return await GetAllRecipiesAsync();
    }

    private async Task AddRecipieIngredientsAsync(RecipieGiverDTO recipie, int addedrecID)
    {
        foreach (Ingredient_Amount ingAmt in recipie.ingredients)
        {
            Unit? unit = await _context.Units.FirstAsync(u => u.Symbol == ingAmt.unit);
            int unitID = unit.Id;
            if (unit is null)
            {
                unitID = 1;
            }

            RecipeIngredient recIngredient = new RecipeIngredient()
            {
                IngredientId = ingAmt.ingredient.Id,
                RecipeId = addedrecID,
                Quantity = ingAmt.quantity,
                UnitId = unitID
            };

            await _context.RecipeIngredients.AddAsync(recIngredient);
        }
        await _context.SaveChangesAsync();
    }

    private async Task<int> addPlainRecipieAsync(RecipieGiverDTO recipie)
    {
        Recipe newRecipie = new Recipe() { Name = recipie.recipie_name, Description = recipie.description, Instructions = recipie.instructions };
        await _context.Recipes.AddAsync(newRecipie);
        await _context.SaveChangesAsync();
        Recipe? addedrec = await _context.Recipes.FirstOrDefaultAsync(r => r.Name == recipie.recipie_name && r.Description == recipie.description);
        int addedrecID = addedrec?.Id ?? -1;
        if (addedrecID == -1)
        {
            throw new Exception("Couldn't find a proper ID for The New Recipie when ading a new recipie");
        }
        return addedrecID;
    }
}
