import { useEffect, useState } from "react";
import RecipeTable from "../Components/RecipeTable";
import Loading from "../Components/Loading";

function RecipeList() {
  const [data, setData] = useState([]);
  const [ingredientNames, setIngredientNames] = useState([]);
  
  useEffect(() => {
    fetch('/api/recipes')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  async function getIngredientNames() {
    const response = await fetch('/api/recipes');
    const recipes = await response.json();
    let ingredients = [];
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        ingredients.push(ingredient.name);
      });
    });
    setIngredientNames([...ingredients])
  }

  getIngredientNames();
    
  if (!data) {
    return <Loading />;
  }

  return <RecipeTable recipes={data} ingredientNames={ingredientNames}/>;
};

export default RecipeList;
