const express = require("express");
const prisma = require("./prisma/index")
const app = express();

app.use(express.json());



app.get("/products", async (request, response) => {
  const products = await prisma.ingredient.findMany()
  return response.json(products);
});

//Pegar elementos pelo indice
app.get("/products/:id", async (request, response) => {
  const { id } = request.params;
  const ingredient = await prisma.ingredient.findUnique({
      where:{
        id,
      }
  })
  return response.json(ingredient);
});

app.get("/products/:name", async (request, response) => {
  const { name } = request.params;
  const ingredient = await prisma.ingredient.findFirst({
    where:{
      name,
    }
  })
  return response.json(ingredient);
});

//-----------------------------------------------------------------------------------

app.get("/recipes", async (request, response) => {
  const recipes = await prisma.recipe.findMany()
  return response.json(recipes)
});

app.get('/recipes/ingredients', async (req, res) => {
  const ingredientsSearch = req.query.ingredients;
  const ingredients = await prisma.recipe.findMany({
    where:{
      ingredients:{
        every:{ name:{
          search: ingredientsSearch
        }}
      }
    }
  })
  return res.json(ingredients);
});


app.listen(4002, () => console.log("Servidor está rodando na porta 4002"));