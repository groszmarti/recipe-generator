const mongoose = require("mongoose");
const recipes = require("./recipes.json");
const RecipeModel = require("./recipe.model");

main().catch((err) => console.log(err));

const populateRecipes = async () => {
  await RecipeModel.deleteMany({});

  const newRecipes = recipes.map((recipe) => ({
    name: recipe.name,
    ingredients: recipe.ingredients.map((ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.quantity,
    })),
    instructions: recipe.instructions,
  }));

  await RecipeModel.create(...newRecipes);
  console.log('Recipes created!')
};

async function main() {
  await mongoose
    .connect(`mongodb://localhost:27017/recipes`)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

  await populateRecipes();

  await mongoose.disconnect();
}
