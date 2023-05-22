const prisma = require("./prisma/index");
const fs = require("fs");

let recipes = [];

recipes = JSON.parse(fs.readFileSync("recipes.json"));

let ingredients = [];

ingredients = JSON.parse(fs.readFileSync("products.json"));

async function migrate() {

  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];
    const finded = await prisma.ingredient.findFirst({ where:{
        name: ingredient.name
    } })

    if (!finded) {
      await prisma.ingredient.create({ data: ingredient })
      console.log(`O ingrediente ${ingredient.name} foi adicionado`)
    }else{
        console.log(`O ingrediente ${ingredient.name} j;a existia e nao foi adicionado`)
    }
  }
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
