import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useIngredientContext } from '../context/useIngredientContextProvider';
import { Ingredient } from '../Data/Ingredient';
import { useNavigate } from 'react-router-dom';

const AddIngredient: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { addIngredient, successToast } = useIngredientContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description) {
      setError('Both name and description are required.');
      return;
    }
    
    const ingr: Ingredient = {description: description, name: name, id: 0};
    addIngredient(ingr);
    successToast("Ingredient add Succesfully!")
    navigate("/Ingredients")
  };

  return (
    <div className="container mt-4">
      <h2>Add a New Ingredient</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="ingredientName" className="form-label">
            Ingredient Name
          </label>
          <input
            type="text"
            id="ingredientName"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ingredientDescription" className="form-label">
            Description
          </label>
          <textarea
            id="ingredientDescription"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary">
          Add Ingredient
        </button>
      </form>
    </div>
  );
};

export default AddIngredient;
