using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using RecipieAPI.Models;

namespace RecipieAPI.Data;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<CustomerIngredient> CustomerIngredients { get; set; }

    public virtual DbSet<Ingredient> Ingredients { get; set; }

    public virtual DbSet<Recipe> Recipes { get; set; }

    public virtual DbSet<RecipeIngredient> RecipeIngredients { get; set; }

    public virtual DbSet<Unit> Units { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("customer_pkey");

            entity.ToTable("customer", "Recipies");

            entity.HasIndex(e => e.Email, "customer_email_key").IsUnique();

            entity.HasIndex(e => e.Username, "customer_username_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
        });

        modelBuilder.Entity<CustomerIngredient>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("customer_ingredient_pkey");

            entity.ToTable("customer_ingredient", "Recipies");

            entity.HasIndex(e => new { e.CustomerId, e.IngredientId }, "customer_ingredient_customer_id_ingredient_id_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.IngredientId).HasColumnName("ingredient_id");
            entity.Property(e => e.Quantity)
                .HasPrecision(10, 2)
                .HasColumnName("quantity");
            entity.Property(e => e.UnitId).HasColumnName("unit_id");

            entity.HasOne(d => d.Customer).WithMany(p => p.CustomerIngredients)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("customer_ingredient_customer_id_fkey");

            entity.HasOne(d => d.Ingredient).WithMany(p => p.CustomerIngredients)
                .HasForeignKey(d => d.IngredientId)
                .HasConstraintName("customer_ingredient_ingredient_id_fkey");

            entity.HasOne(d => d.Unit).WithMany(p => p.CustomerIngredients)
                .HasForeignKey(d => d.UnitId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("customer_ingredient_unit_id_fkey");
        });

        modelBuilder.Entity<Ingredient>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("ingredient_pkey");

            entity.ToTable("ingredient", "Recipies");

            entity.HasIndex(e => e.Name, "ingredient_name_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Recipe>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("recipe_pkey");

            entity.ToTable("recipe", "Recipies");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Instructions).HasColumnName("instructions");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
        });

        modelBuilder.Entity<RecipeIngredient>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("recipe_ingredient_pkey");

            entity.ToTable("recipe_ingredient", "Recipies");

            entity.HasIndex(e => new { e.RecipeId, e.IngredientId }, "recipe_ingredient_recipe_id_ingredient_id_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IngredientId).HasColumnName("ingredient_id");
            entity.Property(e => e.Quantity)
                .HasPrecision(10, 2)
                .HasColumnName("quantity");
            entity.Property(e => e.RecipeId).HasColumnName("recipe_id");
            entity.Property(e => e.UnitId).HasColumnName("unit_id");

            entity.HasOne(d => d.Ingredient).WithMany(p => p.RecipeIngredients)
                .HasForeignKey(d => d.IngredientId)
                .HasConstraintName("recipe_ingredient_ingredient_id_fkey");

            entity.HasOne(d => d.Recipe).WithMany(p => p.RecipeIngredients)
                .HasForeignKey(d => d.RecipeId)
                .HasConstraintName("recipe_ingredient_recipe_id_fkey");

            entity.HasOne(d => d.Unit).WithMany(p => p.RecipeIngredients)
                .HasForeignKey(d => d.UnitId)
                .HasConstraintName("recipe_ingredient_unit_id_fkey");
        });

        modelBuilder.Entity<Unit>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("unit_pkey");

            entity.ToTable("unit", "Recipies");

            entity.HasIndex(e => e.Symbol, "unit_symbol_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Symbol)
                .HasMaxLength(10)
                .HasColumnName("symbol");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
