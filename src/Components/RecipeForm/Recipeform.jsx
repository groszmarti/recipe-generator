const RecipeForm = ({ onSave, disabled, recipe, onCancel }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const recipe = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(recipe);
  };

  return (
    <form className="RecipeForm" onSubmit={onSubmit}>
      {recipe && <input type="hidden" name="_id" defaultValue={recipe._id} />}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={recipe ? recipe.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="ingredients">Ingredients:</label>
        {recipe.ingredients.map((ingredient) => (
          <div key={ingredient._id}>
            <input
              defaultValue={ingredient ? ingredient.quantity : null}
              name="ingredientQuantity"
              id="ingredientQuantity"
            />
            <input
              defaultValue={ingredient ? ingredient.name : null}
              name="ingredientName"
              id="ingredientName"
            />
          </div>
        ))}
      </div>

      <div className="control">
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          defaultValue={recipe ? recipe.instructions : null}
          name="instructions"
          id="instructions"
        />
      </div>

      <div className="control">
        <label htmlFor="image">Image:</label>
        <textarea
          defaultValue={recipe ? recipe.image : null}
          name="image"
          id="image"
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {recipe ? "Update Recipe" : "Create Recipe"}
        </button>
        <br></br>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
