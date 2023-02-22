const express = require('express');
const app = express();
const RecipeModel = require("./recipe.model");

app.use(express.json()); 

app.get('/api/recipes/', async (req,res) => {
  const recipes = await RecipeModel.find();
  return res.json(recipes);
})

app.post('/api/recipes/', (req,res) => {
  res.json('It worked!')
})

app.put('/api/recipes/:id', (req,res) => {
  res.json('It worked!')
})

app.patch('/api/recipes/:id', (req,res) => {
  res.json('It worked!')
})

app.delete('/api/recipes/:id', (req,res) => {
  res.json('It worked!')
})

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
