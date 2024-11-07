using System;
using System.Collections.Generic;

namespace RecipieAPI.Models;

public partial class RecipeIngredient
{
    public int Id { get; set; }

    public int RecipeId { get; set; }

    public int IngredientId { get; set; }

    public decimal Quantity { get; set; }

    public int UnitId { get; set; }

    public virtual Ingredient Ingredient { get; set; } = null!;

    public virtual Recipe Recipe { get; set; } = null!;

    public virtual Unit Unit { get; set; } = null!;
}
