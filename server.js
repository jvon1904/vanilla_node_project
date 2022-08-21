const http = require("http");
const {
  getProduct,
  getProducts,
  createProduct,
} = require("./controllers/productController");
const { getIdParam, invalidRoute } = require("./helperMethods");
const PORT = process.env.PORT || 5000;

const server = http.createServer(function (request, response) {
  if (request.method === "GET") {
    if (request.url.match(/^\/api\/products[\/]?$/g)) {
      getProducts(request, response);
    } else if (request.url.match(/^\/api\/products\/\d+$/g)) {
      const id = getIdParam(request.url);
      getProduct(request, response, id);
    } else {
      invalidRoute(response);
    }
  } else if (request.method === "POST") {
    if (request.url.match(/^\/api\/products[\/]?$/g)) {
      let body = "";
      request.on("data", (chunk) => {
        body += chunk.toString();
      });
      request.on("end", () => {
        createProduct(request, response, body);
      });
    } else {
      invalidRoute(response);
    }
  } else {
    invalidRoute(response);
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
