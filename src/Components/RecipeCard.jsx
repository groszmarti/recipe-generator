import "../index.css";

const RecipeCard = ({ recipe}) => {
  
  return (
      <div className="recipe-details">
        <h4>{recipe.name}</h4>
        <ul>
        {recipe.ingredients.map((ingredient, index)=>
        <li key={index}>{ingredient.name}</li>
        )}
        </ul>
        <p>{recipe.instructions}</p>
      </div>
  )
};

export default RecipeCard;
