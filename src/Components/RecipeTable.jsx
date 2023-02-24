const RecipeTable = ({ recipes, ingredientNames }) => {
  
  return (
    <div className="recipes">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>
              Ingredients
              <select placeholder="Filter by ingredient">
                {ingredientNames.map((ingredient) => (
                  <option key={ingredient._id}>
                    {ingredient}
                    </option>
                ))}
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe._id}>
              <td>{recipe.name}</td>
              <td>
                {recipe.ingredients.map((ingredient) => (
                  <ul key={ingredient._id}>
                    <li>{ingredient.name}</li>
                  </ul>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeTable;
