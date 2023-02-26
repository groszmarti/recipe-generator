import "../index.css";

const RecipeCard = ({ recipe}) => {
  
  return (
      <div className="recipe-details">
        <h4>{recipe.name}</h4><br></br>
        <ul><strong>Ingredients:</strong><br></br>
        {recipe.ingredients.map((ingredient, index)=>
        <li key={index}>{ingredient.name}</li>
        )}
        </ul>
        <p><strong>Instructions:</strong><br></br>
        {recipe.instructions}</p>
      </div>
  )
};

export default RecipeCard;
