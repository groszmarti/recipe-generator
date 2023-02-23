const express = require('express');
const mongoose = require('mongoose');
const app = express();
const RecipeModel = require("./recipe.model");

app.use(express.json()); 

app.get('/api/recipes/', async (req,res) => {
  const recipes = await RecipeModel.find();
  res.json(recipes);
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

mongoose.connect('mongodb://localhost:27017/recipes')
.then (()=>console.log("Connected to MongoDB"))
.then(() => app.listen(3000, () => console.log('Server listening on port 3000')))
    .catch((err) => console.error("Could not connect to MongoDB", err));
