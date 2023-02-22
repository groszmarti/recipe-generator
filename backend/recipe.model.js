const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  name: String,
  ingredients: [
    {
      name: String,
      quantity: String
    }
  ],
  instructions: String
})

module.exports = mongoose.model('recipe', RecipeSchema);