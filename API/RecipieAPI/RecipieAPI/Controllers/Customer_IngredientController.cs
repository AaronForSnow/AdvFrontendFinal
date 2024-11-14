using Microsoft.AspNetCore.Mvc;
using RecipieAPI.Models;
using RecipieAPI.Services;

namespace RecipieAPI.Controllers;
[ApiController]
[Route("[controller]")]
public class Customer_IngredientController : Controller
{
    private readonly Customer_IngredientService _service;
    public Customer_IngredientController(Customer_IngredientService service)
    {
        _service = service;
    }

    [HttpGet("getall/{userEmail}")]
    public List<CustomerIngredientDetails> GetCustomerIngredientsAsync(string userEmail)
    {
        return _service.getall(userEmail);
    }
}
