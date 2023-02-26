import { useState, useEffect } from 'react';
import Loading from '../Components/Loading';

const MealPlan = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [recipes, setRecipes] = useState(null);
  const [recipeNames, setRecipeNames] = useState(null);
  
  useEffect(()=> {
    const getRecipes = async () => {
      const response = await fetch('/api/recipes');
      const data = await response.json();
      setRecipes(data);
      console.log(data);
      let arr = [];
      data.map((recipe)=> arr.push(recipe.name));
      setRecipeNames(arr);
      console.log(recipeNames);
    };
    getRecipes();
  }, []);



  if (!recipes) {
    return <Loading />
  }

  return ( 
    <div className="days">
      {days.map((day, index) =>
        <div>
          <p key={index}><strong>{day}</strong></p>
          <p>{recipeNames}</p>
          <button>Go to recipe</button>
          <button>Pick another recipe</button>
          </div>
      )}
      </div>
   );
}
 
export default MealPlan;