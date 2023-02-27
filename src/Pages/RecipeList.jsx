import { useEffect, useState } from "react";
import RecipeCard from "../Components/RecipeCard";
import Loading from "../Components/Loading";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [ingredientNames, setIngredientNames] = useState([]);
  const [ingredientSelected, setIngredientSelected] = useState("");

  useEffect(() => {
    fetch("/api/recipes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecipes(data);
      });
    getIngredientNames();
  }, []);

  const handleChange = (e) => {
    setIngredientSelected(e.target.value);
    fetch(`/api/filter/?ingredient=${e.target.value}`)
      .then((res) => res.json())
      .then((res) => setRecipes(res));
  };

  console.log(ingredientSelected);

  async function getIngredientNames() {
    const response = await fetch("/api/recipes");
    const recipes = await response.json();
    let ingredients = [];
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        ingredients.push(ingredient.name);
      });
    });
    setIngredientNames([...new Set(ingredients)]);
  }

  if (!recipes) {
    return <Loading />;
  }

  return (
    <div className="recipes">
      <div className="filter">
        <select
          value={ingredientSelected}
          onChange={(e) => handleChange(e)}
          placeholder="Filter by ingredient"
        >
          <option value="">
            --Please choose an ingredient--
          </option>
          {ingredientNames.map((ingredient, index) => (
            <option key={index} value={ingredient}>
              {ingredient}
            </option>
          ))}
        </select>
      </div>
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe._id} />
      ))}
    </div>
  );
}

export default RecipeList;
