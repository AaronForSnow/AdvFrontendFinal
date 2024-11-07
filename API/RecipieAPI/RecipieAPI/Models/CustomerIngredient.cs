using System;
using System.Collections.Generic;

namespace RecipieAPI.Models;

public partial class CustomerIngredient
{
    public int Id { get; set; }

    public int CustomerId { get; set; }

    public int IngredientId { get; set; }

    public decimal? Quantity { get; set; }

    public int? UnitId { get; set; }

    public virtual Customer Customer { get; set; } = null!;

    public virtual Ingredient Ingredient { get; set; } = null!;

    public virtual Unit? Unit { get; set; }
}
