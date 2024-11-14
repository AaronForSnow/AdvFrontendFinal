using Microsoft.AspNetCore.Mvc;
using RecipieAPI.Models;
using RecipieAPI.Services;

namespace RecipieAPI.Controllers;
[ApiController]
[Route("[controller]")]
public class CustomerController : Controller
{
    private readonly CustomerService _service;
    public CustomerController(CustomerService service)
    {
        _service = service;
    }

    [HttpGet("get/{email}")]
    public Customer GetCustomer(string email)
    {
        return _service.GetCustomer(email);
    }

    [HttpPost("add")]
    public async Task<Customer> AddCustomerAsync(Customer c)
    {
        return await _service.AddCustomerAsync(c);
    }
}
