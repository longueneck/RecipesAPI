const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err.message);
  } else {
    products = JSON.parse(data);
  }
});

//--------------------------------------------------------------------------------------------------------
// COMECA OS METODOS

//Pegar todos os elementos
app.get("/products", (request, response) => {
  return response.json(products);
});


//Pegar elementos pelo indice
app.get("/products/:id", (request, response) => {
  const { id } = request.params;
  const product = products.find((product) => product.id == id); // Use '==' em vez de '===' para comparar string e número
  return response.json(product);
});

app.get("/products/:name", (request, response) => {
  const { name } = request.params;
  const product = products.filter((product) => product.name === name);
  return response.json(product);
});

app.listen(4002, () => console.log("Servidor esta rodando na porta 4002"));
