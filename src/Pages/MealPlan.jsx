import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";

const MealPlan = () => {
  const [mondayRecipe, setMondayRecipe] = useState(null);
  const [tuesdayRecipe, setTuesdayRecipe] = useState(null);
  const [wednesdayRecipe, setWednesdayRecipe] = useState(null);
  const [thursdayRecipe, setThursdayRecipe] = useState(null);
  const [fridayRecipe, setFridayRecipe] = useState(null);
  const [saturdayRecipe, setSaturdayRecipe] = useState(null);
  const [sundayRecipe, setSundayRecipe] = useState(null);
  const [chosenIngredients, setChosenIngredients] = useState([]);

  const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

  const getRandomRecipe = async (day) => {
    const res = await fetch("/api/recipes");
    const data = await res.json();
    if (day === "Monday") {
      setMondayRecipe(pick(data));
    } else if (day === "Tuesday") {
      setTuesdayRecipe(pick(data));
    } else if (day === "Wednesday") {
      setWednesdayRecipe(pick(data));
    } else if (day === "Thursday") {
      setThursdayRecipe(pick(data));
    } else if (day === "Friday") {
      setFridayRecipe(pick(data));
    } else if (day === "Saturday") {
      setSaturdayRecipe(pick(data));
    } else if (day === "Sunday") {
      setSundayRecipe(pick(data));
    }
  };

  useEffect(() => {
    getRandomRecipe("Monday");
    getRandomRecipe("Tuesday");
    getRandomRecipe("Wednesday");
    getRandomRecipe("Thursday");
    getRandomRecipe("Friday");
    getRandomRecipe("Saturday");
    getRandomRecipe("Sunday");
  }, []);

  const handleRandomRecipe = (day) => {
    getRandomRecipe(day);
  };

  const handleAddIngredients = () => {
    console.log("it worked");
    let recipes = [];
    recipes.push(mondayRecipe);
    recipes.push(tuesdayRecipe);
    recipes.push(wednesdayRecipe);
    recipes.push(thursdayRecipe);
    recipes.push(fridayRecipe);
    recipes.push(saturdayRecipe);
    recipes.push(sundayRecipe);
    let ingredients = [];
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        ingredients.push(ingredient);
      });
    });
    setChosenIngredients([...new Set(ingredients)]);
  };
  console.log(chosenIngredients);

  console.log(chosenIngredients);

  if (
    !mondayRecipe ||
    !tuesdayRecipe ||
    !wednesdayRecipe ||
    !thursdayRecipe ||
    !fridayRecipe ||
    !saturdayRecipe ||
    !sundayRecipe ||
    !chosenIngredients
  ) {
    return <Loading />;
  }

  return (
    <div className="recipe-randomizer">
      <div className="days">
        <div className="recipe-days">
          <p>
            <strong>Monday</strong>
          </p>
          <p>{mondayRecipe.name}</p>
          <img src={mondayRecipe.image} width="200" alt="recipe"></img>
          <br></br>
          <Link to={`/recipes/${mondayRecipe._id}`}>
            <button>Go to recipe</button>
          </Link>
          <br></br>
          <button onClick={() => handleRandomRecipe("Monday")}>
            Pick another recipe
          </button>
        </div>
        <div className="recipe-days">
          <p>
            <strong>Tuesday</strong>
          </p>
          <p>{tuesdayRecipe.name}</p>
          <img src={tuesdayRecipe.image} width="200" alt="recipe"></img>
          <br></br>
          <Link to={`/recipes/${tuesdayRecipe._id}`}>
            <button>Go to recipe</button>
          </Link>
          <br></br>
          <button onClick={() => handleRandomRecipe("Tuesday")}>
            Pick another recipe
          </button>
        </div>
        <div className="recipe-days">
          <p>
            <strong>Wednesday</strong>
          </p>
          <p>{wednesdayRecipe.name}</p>
          <img src={wednesdayRecipe.image} width="200" alt="recipe"></img>
          <br></br>
          <Link to={`/recipes/${wednesdayRecipe._id}`}>
            <button>Go to recipe</button>
          </Link>
          <br></br>
          <button onClick={() => handleRandomRecipe("Wednesday")}>
            Pick another recipe
          </button>
        </div>
        <div className="recipe-days">
          <p>
            <strong>Thursday</strong>
          </p>
          <p>{thursdayRecipe.name}</p>
          <img src={thursdayRecipe.image} width="200" alt="recipe"></img>
          <br></br>
          <Link to={`/recipes/${thursdayRecipe._id}`}>
            <button>Go to recipe</button>
          </Link>
          <br></br>
          <button onClick={() => handleRandomRecipe("Thursday")}>
            Pick another recipe
          </button>
        </div>
        <div className="recipe-days">
          <p>
            <strong>Friday</strong>
          </p>
          <p>{fridayRecipe.name}</p>
          <img src={fridayRecipe.image} width="200" alt="recipe"></img>
          <br></br>
          <Link to={`/recipes/${fridayRecipe._id}`}>
            <button>Go to recipe</button>
          </Link>
          <br></br>
          <button onClick={() => handleRandomRecipe("Friday")}>
            Pick another recipe
          </button>
        </div>
        <div className="recipe-days">
          <p>
            <strong>Saturday</strong>
          </p>
          <p>{saturdayRecipe.name}</p>
          <img src={saturdayRecipe.image} width="200" alt="recipe"></img>
          <br></br>
          <Link to={`/recipes/${saturdayRecipe._id}`}>
            <button>Go to recipe</button>
          </Link>
          <br></br>
          <button onClick={() => handleRandomRecipe("Saturday")}>
            Pick another recipe
          </button>
        </div>
        <div className="recipe-days">
          <p>
            <strong>Sunday</strong>
          </p>
          <p>{sundayRecipe.name}</p>
          <img src={sundayRecipe.image} width="200" alt="recipe"></img>
          <br></br>
          <Link to={`/recipes/${sundayRecipe._id}`}>
            <button>Go to recipe</button>
          </Link>
          <br></br>
          <button onClick={() => handleRandomRecipe("Sunday")}>
            Pick another recipe
          </button>
        </div>
      </div>
      <div className="shopping-list">
        <div className="create-shoppinglist">
          <button onClick={handleAddIngredients}>Create shopping list</button>
        </div>
        <h1>Shopping list:</h1>
        {chosenIngredients.map((ingredient) => (
          <ul>
            {/^\d/.test(ingredient.quantity) ? (
              <li key={ingredient._id}>
                {ingredient.quantity} {ingredient.name}
              </li>
            ) : (
              <li key={ingredient._id}>{ingredient.name}</li>
            )}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default MealPlan;
