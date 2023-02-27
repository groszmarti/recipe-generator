import { useEffect, useState } from "react";
import RecipeCard from "../Components/RecipeCard";
import Loading from "../Components/Loading";


function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [ingredientNames, setIngredientNames] = useState([]);
  const [ingredientSelected, setIngredientSelected] = useState('Please select an ingredient');
  
  useEffect(() => {
    fetch('/api/recipes')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setRecipes(data);
    });
    getIngredientNames();
  }, []);

  useEffect(() => {
    handleFilter(ingredientSelected).then((res) => setRecipes(res));
  }, [ingredientSelected])


  const handleFilter = (selectedIngredient) => {
    fetch(`/api/filter/?ingredient=${selectedIngredient}`).then((res) => res.json());
  };
  
  const handleChange = (e) => {
    setIngredientSelected(e.target.value);
  }

  console.log(ingredientSelected)

  async function getIngredientNames() {
    const response = await fetch('/api/recipes');
    const recipes = await response.json();
    let ingredients = [];
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        ingredients.push(ingredient.name);
      });
    });
    setIngredientNames([...new Set(ingredients)]);
  }

    
  if (!recipes || !ingredientSelected) {
    return <Loading />;
  }

  return (
    <div className="recipes">
      <div className="filter">
              <select 
              value={ingredientSelected}
              onChange={(e)=>handleChange(e)} 
              placeholder="Filter by ingredient"
              >
                <option disabled value="">--Please choose an ingredient--</option>
                {ingredientNames.map((ingredient, index) => (
                  <option 
                  key={index}
                  value={ingredient}
                  >
                    {ingredient}
                    </option>
                ))}
              </select>
      </div>
      {recipes.map((recipe)=>
        <RecipeCard recipe={recipe} key={recipe._id}/>
      )
      }
    </div>
  )
};

export default RecipeList;
