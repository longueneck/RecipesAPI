const express = require("express");
const { randomUUID } = require("crypto");

const app = express();

app.use(express.json());

const products = [];

app.post("/products", (request, response) => {
 
  const { name, price } = request.body;

  console.log(request.body)

  const product = 

  {
    name,
    price,
    id: randomUUID(),
  };

  products.push(product);

 return response.json(product);
});

app.get("/products", (request, response) => {
  return response.json(products);
});

app.get("/products/:id", (request, response) => {
  const {id} = request.params;
  const product = products.find(products => product.id === id)
})


app.listen(4002, () => console.log("Servidor esta rodando na porta 4002"));
