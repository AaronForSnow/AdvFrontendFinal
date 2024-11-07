using System;
using System.Collections.Generic;

namespace RecipieAPI.Models;

public partial class Ingredient
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<CustomerIngredient> CustomerIngredients { get; set; } = new List<CustomerIngredient>();

    public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();
}
