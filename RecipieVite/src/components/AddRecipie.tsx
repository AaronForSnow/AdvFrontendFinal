import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useIngredientContext } from '../context/useIngredientContextProvider';
import { useNavigate } from 'react-router-dom';
import { RecipieIngredient } from '../Data/RecipieIngredient';
import { Recipie } from '../Data/Recipie';
import { Ingredient } from '../Data/Ingredient';
import { useAuth } from 'react-oidc-context';

const AddRecipie: React.FC = () => {
  const auth = useAuth();
    const [recipieName, setRecipieName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');
    const [recipieIngredients, setRecipieIngredients] = useState<RecipieIngredient[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    const { addRecipie, successToast, ingredients } = useIngredientContext();
    const navigate = useNavigate();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!recipieName || !description || !instructions || recipieIngredients.length === 0) {
        setError('All fields are required, including at least one ingredient.');
        return;
      }
  
      const newRecipie: Recipie = {
        id: 0, // ID will be handled by backend or context
        recipie_name: recipieName,
        description: description,
        instructions: instructions,
        ingredients: recipieIngredients,
      };
  
      addRecipie(newRecipie);
      successToast('Recipe added successfully!');
      navigate('/Recipies');
    };
  
    const handleIngredientChange = (index: number, field: string, value: Ingredient | undefined | number | string) => {
      const newIngredients = [...recipieIngredients];
      newIngredients[index] = { ...newIngredients[index], [field]: value };
      setRecipieIngredients(newIngredients);
    };
  
    const addIngredientToList = () => {
      setRecipieIngredients([...recipieIngredients, { unit: '', quantity: 0, ingredient: ingredients[0] }]);
    };
    if (auth.isAuthenticated){

      return (
        <div className="container mt-4">
        <h2>Add a New Recipe</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label htmlFor="recipieName" className="form-label">
              Recipe Name
            </label>
            <input
              type="text"
              id="recipieName"
              className="form-control"
              value={recipieName}
              onChange={(e) => setRecipieName(e.target.value)}
              required
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="recipieDescription" className="form-label">
              Description
            </label>
            <textarea
              id="recipieDescription"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              />
          </div>
  
          <div className="mb-3">
            <label htmlFor="instructions" className="form-label">
              Instructions
            </label>
            <textarea
              id="instructions"
              className="form-control"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
              />
          </div>
  
          <div className="mb-3">
            <h4>Ingredients</h4>
            {recipieIngredients.map((ingredient, index) => (
              <div key={index} className="ingredient-row mb-2">
                <select
                  className="form-control mb-2"
                  value={ingredient.ingredient?.id || ''}
                  onChange={(e) =>
                    handleIngredientChange(index, 'ingredient', ingredients.find((ingr) => ingr.id === +e.target.value) || ingredients[0])
                  }
                  >
                  {ingredients.map((ingr) => (
                    <option key={ingr.id} value={ingr.id}>
                      {ingr.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', +e.target.value)}
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                  required
                  />
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addIngredientToList}>
              Add Ingredient
            </button>
          </div>
  
          {error && <div className="alert alert-danger">{error}</div>}
  
          <button type="submit" className="btn btn-primary">
            Add Recipe
          </button>
        </form>
      </div>
    );
  }
  else {
    return(
      <h1 className='d-flex justify-content-center'>Please sign in to use this page</h1>
    )
  }
  };
  
  export default AddRecipie;