const Product = require("../models/Product");

// @desc gets a product by id
// @route GET /api/products/:id
async function getProduct(request, response, id) {
  try {
    const result = await Product.find(id);
    if (result.data.length === 0) {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({
          success: false,
          message: `No product with specified id: ${id}`,
        })
      );
    } else {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(result));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc gets all products
// @route GET /api/products
async function getProducts(request, response) {
  try {
    const result = await Product.all();
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
}

// @desc creates a product
// @route POST /api/products
async function createProduct(request, response, body) {
  const data = JSON.parse(body);
  try {
    const result = await Product.create(data);
    response.writeHead(201, { "Content-Type": "application/json" });
    response.end(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
}

// @desc updates a product
// @route PUT /api/products/:id
async function updateProduct(request, response, id, body) {
  const data = JSON.parse(body);
  try {
    const result = await Product.update(id, data);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
}

// @desc updates a product
// @route PUT /api/products/:id
async function updateProduct(request, response, id, body) {
  const data = JSON.parse(body);
  try {
    const result = await Product.update(id, data);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
}

// @desc deletes a product
// @route DELETE /api/products/:id
async function deleteProduct(request, response, id) {
  try {
    const result = await Product.remove(id);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
