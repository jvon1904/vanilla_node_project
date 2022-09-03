const { parse } = require("dotenv");
const Product = require("../models/Product");

// @desc gets a product by id
// @route GET /api/products/:id
async function getProduct(request, response, id) {
  try {
    const result = await Product.find(id);
    if (result.data.length === 0) {
      response.writeHead(404, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
      });
      response.end(
        JSON.stringify({
          success: false,
          message: `No product with specified id: ${id}`,
        })
      );
    } else {
      response.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
      });
      response.end(JSON.stringify(result));
    }
  } catch (error) {
    console.error(error);
  }
}

// @desc gets all products
// @route GET /api/products
async function getProducts(request, response) {
  try {
    const result = await Product.all();
    response.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
    });
    response.end(JSON.stringify(result));
  } catch (error) {
    console.error(error);
  }
}

// @desc creates a product
// @route POST /api/products
async function createProduct(request, response, body) {
  try {
    const result = await Product.create(JSON.parse(body));
    response.writeHead(201, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
    });
    response.end(JSON.stringify(result));
  } catch (error) {
    console.error(error);
  }
}

// @desc updates a product
// @route PUT /api/products/:id
async function updateProduct(request, response, id, body) {
  const data = JSON.parse(body);
  try {
    const result = await Product.update(id, data);
    response.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
    });
    response.end(JSON.stringify(result));
  } catch (error) {
    console.error(error);
  }
}

// @desc updates a product
// @route PUT /api/products/:id
async function updateProduct(request, response, id, body) {
  const data = JSON.parse(body);
  try {
    const result = await Product.update(id, data);
    response.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
    });
    response.end(JSON.stringify(result));
  } catch (error) {
    console.error(error);
  }
}

// @desc deletes a product
// @route DELETE /api/products/:id
async function deleteProduct(request, response, id) {
  try {
    const result = await Product.remove(id);
    response.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "HEAD, OPTIONS, GET, PUT, POST, DELETE",
      "Access-Control-Allow-Headers":
        "Referer, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, User-Agent",
      "Content-Type": "application/json",
    });
    response.end(JSON.stringify(result));
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
