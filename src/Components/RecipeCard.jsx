import "../index.css";
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe, onDelete }) => {
  
  return (
      <div className="recipe-details">
        <h4>{recipe.name}</h4><br></br>
        <div className="image">
        <ul><strong>Ingredients:</strong><br></br>
        {recipe.ingredients.map((ingredient, index) =>
        /^\d/.test(ingredient.quantity)
        ? <li key={ingredient._id}>{ingredient.quantity} {ingredient.name}</li>
        : <li key={ingredient._id}>{ingredient.name} ({ingredient.quantity})</li>        
        )}
        </ul>
        <img width="500" src={recipe.image} alt="recipe"></img>
          </div>
        <p><strong>Instructions:</strong><br></br>
        {recipe.instructions}</p>
        <Link to={`/update/${recipe._id}`}>
        <button>Update</button>
        </Link>
        <br></br>
        <button onClick={() => onDelete(recipe._id)}>Delete</button>
      </div>
  )
};

export default RecipeCard;
