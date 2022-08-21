const Product = require("../models/productModel");

// @desc gets a product by id
// @route GET /api/products/:id
async function getProduct(request, response, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({
          success: false,
          message: `No product with specified id: ${id}`,
        })
      );
    } else {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc gets all products
// @route GET /api/products
async function getProducts(request, response) {
  try {
    const products = await Product.findAll();
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

// @desc creates a product
// @route POST /api/products
function createProduct(request, response, body) {
  try {
    const product = body;
    Product.newProduct(product);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(product);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProduct,
  getProducts,
  createProduct,
};
