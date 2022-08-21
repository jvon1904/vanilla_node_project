const fs = require("fs");
const products = require("../data/products");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    resolve(products.find((product) => product.id === id));
  });
}

function newProduct(product) {
  products.push(JSON.parse(product));
  fs.writeFile("./data/products.json", JSON.stringify(products), (error) =>
    console.log(error)
  );
}

module.exports = {
  findById,
  findAll,
  newProduct,
};
