using Microsoft.AspNetCore.Mvc;
using RecipieAPI.Services;

namespace RecipieAPI.Controllers;
[ApiController]
[Route("[controller]")]
public class RecipieController : Controller
{


    private readonly RecipieService _service;
    public RecipieController(RecipieService service)
    {
        _service = service;
    }

    [HttpGet("getall")]
    public async Task<List<RecipieGiverDTO>> GetAllRecipies()
    {
        var result = await _service.GetAllRecipiesAsync();
        return result;
    }
}
