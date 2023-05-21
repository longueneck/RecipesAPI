const prisma = require("./prisma/index");
const fs = require("fs");

let recipes = [];

recipes = JSON.parse(fs.readFileSync("recipes.json"));

let ingredients = [];

ingredients = JSON.parse(fs.readFileSync("products.json"));

async function migrate() {
//   for (let i = 0; i < recipes.length; i++) {
//     const recipe = recipes[i];
//     await prisma.recipe.create({
//       data: {},
//     });
//   }

  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];
    await prisma.ingredient.create({
      data: {
        name: ingredient.name
      }
    });
  }
}
const finded = await prisma.ingredient.findOne({ where: ingredient.name })

if (!finded) {
  await prisma.ingredient.create({ data: ingredient.name })
}

function parseDifficulty(type) {
  switch (type) {
    case "Fácil": {
      return "Easy";
      break;
    }

    case "Médio": {
      return "Medium";
      break;
    }

    case "Difícil": {
      return "Hard";
      break;
    }

    case "Muito Difícil": {
      return "VaryHard";
      break;
    }
  }
}

function parseType(type) {
  switch (type) {
    case "Refeiçao": {
      return "Meal";
    }
    case "Café da Manhã": {
      return "Breakfast";
    }
    case "Sobremesa": {
      return "Dessert";
    }
    case "Lanche": {
      return "Snack";
    }
    case "Bebidas": {
      return "Drink";
    }
  }
}



migrate();
