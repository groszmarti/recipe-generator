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
      {recipe && (
        <input type="hidden" name="_id" defaultValue={recipe._id} />
      )}

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
        <input
          defaultValue={recipe ? recipe.ingredients : null}
          name="ingredients"
          id="ingredients"
        />
      </div>

      <div className="control">
        <label htmlFor="instructions">Instructions:</label>
        <input
          defaultValue={recipe ? recipe.instructions : null}
          name="instructions"
          id="instructions"
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {recipe ? "Update Recipe" : "Create Recipe"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
