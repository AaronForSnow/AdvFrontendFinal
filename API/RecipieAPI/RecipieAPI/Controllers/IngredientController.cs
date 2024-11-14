using Microsoft.AspNetCore.Mvc;
using RecipieAPI.Models;
using RecipieAPI.Services;

namespace RecipieAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class IngredientController : Controller
{
    private readonly IngredientService _service;
    public IngredientController(IngredientService service)
    {
        _service = service;
    }

    [HttpGet("getall")]
    public async Task<List<Ingredient>> GetIngredientsAsync()
    {
        return await _service.GetIngredientsAsync();
        //return new();
    }

    [HttpPost("add")]
    public async Task<List<Ingredient>> AddIngredientAsync(Ingredient i){
        return await _service.AddIngredientAsync(i);
    }

    [HttpDelete("delete/{id}")]
    public async Task<List<Ingredient>> DeleteIngredientAsync(int id){
        return await _service.DeleteIngredientAsync(id);
    }
}
