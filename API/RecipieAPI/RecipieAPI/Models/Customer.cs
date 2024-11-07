using System;
using System.Collections.Generic;

namespace RecipieAPI.Models;

public partial class Customer
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual ICollection<CustomerIngredient> CustomerIngredients { get; set; } = new List<CustomerIngredient>();
}
