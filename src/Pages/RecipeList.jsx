import { useEffect, useState } from "react";
import RecipeCard from "../Components/RecipeCard";
import Loading from "../Components/Loading";

const deleteRecipe = (id) => {
  return fetch(`/api/recipes/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [ingredientNames, setIngredientNames] = useState([]);
  const [ingredientSelected, setIngredientSelected] = useState("");

  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete?');

    if(confirm) {
      deleteRecipe(id)
      getIngredientNames()
      .catch((err) => {
        console.log(err);
      });
    }

    setRecipes((recipes) => {
      return recipes.filter((recipe) => recipe._id !== id);
    });
  };

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
    e.target.value === ""
    ? fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
    : fetch(`/api/filter/?ingredient=${e.target.value}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
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
        <RecipeCard recipe={recipe} key={recipe._id} onDelete={handleDelete}/>
      ))}
    </div>
  );
}

export default RecipeList;
