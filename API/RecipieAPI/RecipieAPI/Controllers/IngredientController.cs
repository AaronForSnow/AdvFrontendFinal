using Microsoft.AspNetCore.Mvc;
using RecipieAPI.Models;
using RecipieAPI.Services;

namespace RecipieAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class IngredientController : Controller
{
    private readonly Ingredients _service;
    public IngredientController(Ingredients service)
    {
        _service = service;
    }

    [HttpGet("getall")]
    public async Task<List<Ingredient>> GetIngredientsAsync()
    {
        return await _service.GetIngredientsAsync();
        //return new();
    }
    //public IActionResult Index()
    //{
    //    return View();
    //}
}
