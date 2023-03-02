import React, { useState } from 'react';
import '../index.css';

const NewRecipeForm = ( {onCancel, disabled} ) => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [instructions, setInstructions] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name: recipeName,
      ingredients,
      instructions,
      image,
      createdAt: Date.now()
    };

    fetch('/api/recipes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('New recipe created:', data);
        setRecipeName('');
        setIngredients([{ name: '', quantity: '' }]);
        setInstructions('');
        setImage('');
      })
      .catch((error) => {
        console.error('Error creating recipe:', error);
      });
  };

  const handleIngredientChange = (event, index) => {
    const { name, value } = event.target;
    const newIngredients = [...ingredients];
    newIngredients[index][name] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="recipeName">Recipe Name:</label>
        <input
          type="text"
          id="recipeName"
          value={recipeName}
          onChange={(event) => setRecipeName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="ingredients">Ingredients:</label>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={ingredient.name}
              onChange={(event) => handleIngredientChange(event, index)}
            />
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
      </div>
      <div>
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(event) => setInstructions(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          id="image"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />
      </div>
      <button type="submit" disabled={disabled}>Submit</button>
      <button onCancel={onCancel}>Cancel</button>
    </form>
  );
};

export default NewRecipeForm;
