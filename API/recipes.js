const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

let recipes = [];

fs.readFile("recipes.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err.message);
  } else {
    products = JSON.parse(data);
  }
});

//--------------------------------------------------------------------------------------------------------
// COMECA OS METODOS

//Pegar todos os elementos
app.get("/recipes", (request, response) => {
  return response.json(recipes);
});

//Pegar elementos pelo indice
app.get("/recipes/:id", (request, response) => {
  const { id } = request.params;
  const recipe = recipes.find((product) => recipe.id == id); // Use '==' em vez de '===' para comparar string e número
  return response.json(recipe);
});

//Pegar elementos pelo texto
app.get("/products/:name", (request, response) => {
  const { name } = request.params;
  const product = products.filter((product) => product.name === name);
  return response.json(product);
});


app.listen(4001, () => console.log("Servidor esta rodando na porta 4001"));
