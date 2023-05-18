const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

let recipes = [];

fs.readFile("recipes.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err.message);
  } else {
    recipes = JSON.parse(data); 
  }
});

app.get("/recipes", (request, response) => {
  return response.json(recipes);
});

app.get('/recipes/ingredients', (req, res) => {
  const ingredients = req.query.ingredients.split(',');

  const filteredRecipes = recipes.filter(recipe => {
    const recipeIngredients = recipe.ingredients;
    console.log(recipe.ingredients);
    return ingredients.every(ingredient =>
      recipeIngredients.indexOf(ingredient) > -1   
    );
  });

  if (filteredRecipes.length === 0) {
    return res.status(404).json({ message: "Nenhuma receita encontrada" });
  }
  
  return res.json(filteredRecipes);
});


app.listen(4001, () => console.log("Servidor está rodando na porta 4001"));