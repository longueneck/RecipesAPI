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

// Pegar todos os elementos
app.get("/recipes", (request, response) => {
  return response.json(recipes);
});

// Pegar elementos pelo indice
app.get("/recipes/:id", (request, response) => {
  const { id } = request.params;
  const recipe = recipes.find((recipe) => recipe.id == id);
  return response.json(recipe);
});

// Pegar elementos pelo nome
app.get("/recipes/:name", (request, response) => { // Renomear para evitar conflitos
  const { name } = request.params;
  const recipe = recipes.filter((recipe) => recipe.name == name);
  return response.json(recipe);
});

app.get('/recipes/ingredients', (req, res) => {
  const ingredients = req.query.ingredients.split(',');

  const filteredRecipes = recipes.filter(recipe => {
    const recipeIngredients = recipe.ingredients;

    return ingredients.every(ingredient =>
      recipeIngredients.includes(ingredient)
    );
  });

  if (filteredRecipes.length === 0) {
    return res.status(404).json({ message: "Nenhuma receita encontrada" });
  }

  return res.json(filteredRecipes[0]);
});


app.listen(4001, () => console.log("Servidor está rodando na porta 4001"));