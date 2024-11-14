using RecipieAPI.Data;
using RecipieAPI.Models;

namespace RecipieAPI.Services;

public class CustomerService
{
    private readonly AppDbContext _context;
    public CustomerService(AppDbContext db)
    {
        _context = db;
    }

    public Customer GetCustomer(string email)
    {
        Customer? c = _context.Customers.FirstOrDefault(x => x.Email == email) ?? null;
        if (c == null)
        {
            return new Customer();
        }
        return c;
    }

    public async Task<Customer> AddCustomerAsync(Customer customer)
    {
        await _context.Customers.AddAsync(customer);
        await _context.SaveChangesAsync();
        return customer;
    }
}
