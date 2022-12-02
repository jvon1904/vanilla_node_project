const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/productController");
const {
  getIdParam,
  parseURLParameters,
  invalidRoute,
} = require("./helperMethods");
const PORT = process.env.SERVER_PORT || 5000;

const server = http.createServer(function (request, response) {
  if (request.method === "OPTIONS") {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
      "Access-Control-Allow-Methods",
      "HEAD, OPTIONS, GET, PUT, POST, DELETE"
    );
    response.setHeader(
      "Access-Control-Allow-Headers",
      "Referer, sec-ch-ua, sec-ch-ua-mobile, sec-ch-ua-platform, User-Agent, Content-Type"
    );
    response.setHeader("Content-Type", "application/json");
    response.writeHead(200);
    response.end();
    return;
  }
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
      let body = [];
      request
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          if (
            request.headers["content-type"] ===
            "application/x-www-form-urlencoded"
          ) {
            body = parseURLParameters(body);
          }
          createProduct(request, response, body);
        });
    } else {
      invalidRoute(response);
    }
  } else if (request.method === "PUT") {
    if (request.url.match(/^\/api\/products\/\d+$/g)) {
      const id = getIdParam(request.url);
      let body = [];
      request
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          body = Buffer.concat(body).toString();
          updateProduct(request, response, id, body);
        });
    } else {
      invalidRoute(response);
    }
  } else if (request.method === "DELETE") {
    if (request.url.match(/^\/api\/products\/\d+$/g)) {
      const id = getIdParam(request.url);
      deleteProduct(request, response, id);
    } else {
      invalidRoute(response);
    }
  } else {
    invalidRoute(response);
  }
});
console.log(dotenv.config());
console.log(PORT);
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
