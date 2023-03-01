import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Loading from '../Components/Loading';

const MealPlan = () => {
  const [mondayRecipe, setMondayRecipe] = useState(null);
  const [tuesdayRecipe, setTuesdayRecipe] = useState(null);
  const [wednesdayRecipe, setWednesdayRecipe] = useState(null);
  const [thursdayRecipe, setThursdayRecipe] = useState(null);
  const [fridayRecipe, setFridayRecipe] = useState(null);
  const [saturdayRecipe, setSaturdayRecipe] = useState(null);
  const [sundayRecipe, setSundayRecipe] = useState(null);

  const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

  const getRandomRecipe = async (day) => {
    const res = await fetch('/api/recipes');
    const data = await res.json();
    if (day === 'Monday') {
      setMondayRecipe(pick(data));
    } else if (day === 'Tuesday') {
      setTuesdayRecipe(pick(data));
    } else if (day === 'Wednesday') {
      setWednesdayRecipe(pick(data));
    } else if (day === 'Thursday') {
      setThursdayRecipe(pick(data));
    } else if (day === 'Friday') {
      setFridayRecipe(pick(data));
    } else if (day === 'Saturday') {
      setSaturdayRecipe(pick(data));
    } else if (day === 'Sunday') {
      setSundayRecipe(pick(data));
    }
  }

  useEffect(()=> {
    getRandomRecipe('Monday');
    getRandomRecipe('Tuesday');
    getRandomRecipe('Wednesday');
    getRandomRecipe('Thursday');
    getRandomRecipe('Friday');
    getRandomRecipe('Saturday');
    getRandomRecipe('Sunday');
  }, []);

  const handleRandomRecipe = (day) => {
    getRandomRecipe(day)
  }


  if (!mondayRecipe 
    || !tuesdayRecipe 
    || !wednesdayRecipe 
    || !thursdayRecipe 
    || !fridayRecipe 
    || !saturdayRecipe 
    || !sundayRecipe) {
    return <Loading />
  }

  return ( 
    <div className="days">
        <div className="recipe-days">
          <p><strong>Monday</strong></p>
          <p>{mondayRecipe.name}</p>
          <Link to={`/recipes/${mondayRecipe._id}`}>
          <button>Go to recipe</button>
          </Link>
          <button onClick={()=>handleRandomRecipe('Monday')}>Pick another recipe</button>
          </div>
          <div className="recipe-days">
          <p><strong>Tuesday</strong></p>
          <p>{tuesdayRecipe.name}</p>
          <button>Go to recipe</button>
          <button onClick={()=>handleRandomRecipe('Tuesday')}>Pick another recipe</button>
          </div>
          <div className="recipe-days">
          <p><strong>Wednesday</strong></p>
          <p>{wednesdayRecipe.name}</p>
          <button>Go to recipe</button>
          <button onClick={()=>handleRandomRecipe('Wednesday')}>Pick another recipe</button>
          </div>
          <div className="recipe-days">
          <p><strong>Thursday</strong></p>
          <p>{thursdayRecipe.name}</p>
          <button>Go to recipe</button>
          <button onClick={()=>handleRandomRecipe('Thursday')}>Pick another recipe</button>
          </div>
          <div className="recipe-days">
          <p><strong>Friday</strong></p>
          <p>{fridayRecipe.name}</p>
          <button>Go to recipe</button>
          <button onClick={()=>handleRandomRecipe('Friday')}>Pick another recipe</button>
          </div>
          <div className="recipe-days">
          <p><strong>Saturday</strong></p>
          <p>{saturdayRecipe.name}</p>
          <button>Go to recipe</button>
          <button onClick={()=>handleRandomRecipe('Saturday')}>Pick another recipe</button>
          </div>
          <div className="recipe-days">
          <p><strong>Sunday</strong></p>
          <p>{sundayRecipe.name}</p>
          <button>Go to recipe</button>
          <button onClick={()=>handleRandomRecipe('Sunday')}>Pick another recipe</button>
          </div>
      </div>
   );
}
 
export default MealPlan;