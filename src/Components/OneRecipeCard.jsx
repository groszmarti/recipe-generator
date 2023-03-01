import "../index.css";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import Loading from "./Loading";

const OneRecipeCard = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(`/api/recipes/${id}`);
      const data = await res.json();
      setRecipe(data);
    }
    fetchRecipe()
  }, [])

  console.log(recipe);

  if (!recipe) {
    return <Loading />
  }

  return (
      <div className="recipe-details">
        <h4>{recipe.name}</h4><br></br>
        <ul><strong>Ingredients:</strong><br></br>
        {recipe.ingredients.map((ingredient, index) =>
        /^\d/.test(ingredient.quantity)
        ? <li key={index}>{ingredient.quantity} {ingredient.name}</li>
        : <li key={index}>{ingredient.name} ({ingredient.quantity})</li>        
        )}
        </ul>
        <p><strong>Instructions:</strong><br></br>
        {recipe.instructions}</p>
      </div>
  )
};

export default OneRecipeCard;
