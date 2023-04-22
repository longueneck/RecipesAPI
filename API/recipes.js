const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

let recipes = [];

fs.readFile("recipes.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err.message);
  } else {
    recipes = JSON.parse(data); // Corrigir para recipes em vez de products
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

// Pegar elementos pelo nivel
app.get("/recipes/nivel/:nivel", (request, response) => { // Renomear e corrigir comparação
  const { nivel } = request.params;
  const recipe = recipes.filter((recipe) => recipe.nivel === parseInt(nivel)); // Converter nivel para número
  return response.json(recipe);
});

app.listen(4001, () => console.log("Servidor está rodando na porta 4001"));