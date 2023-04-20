const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");


function getID() {
  let id = 0;
 return function(){
  id++;
  return id;
 };
}

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

app.post("/products", (request, response) => {
  const { name, price, id } = request.body;

  console.log(request.body);

  const product = {
    name,
    price,
    id : getID(),
  };

  products.push(product);

  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Produto Inserido");
    }
  });

  return response.json(product);
});

app.get("/products", (request, response) => {
  return response.json(products);
});

app.get("/products/:id", (request, response) => {
  const { id } = request.params;
  const product = products.find((products) => product.id === id);
  return response.json(product);
});

app.put("/products/:id", (request, response) => {
  const { id } = request.params;
  const { name, price } = request.body;
});

app.listen(4002, () => console.log("Servidor esta rodando na porta 4002"));
