using System;
using System.Collections.Generic;

namespace RecipieAPI.Models;

public partial class Unit
{
    public int Id { get; set; }

    public string Symbol { get; set; } = null!;

    public virtual ICollection<CustomerIngredient> CustomerIngredients { get; set; } = new List<CustomerIngredient>();

    public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();
}
