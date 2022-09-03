function getIdParam(path) {
  return path.split("/").slice(-1).pop();
}

function parseURLParameters(body) {
  body = decodeURIComponent(body)
    .replaceAll("+", " ")
    .split("&")
    .map((attribute) => {
      return attribute.split("=");
    });
  let jsonData = {};
  body.forEach((pair) => {
    jsonData[pair[0]] = pair[1];
  });
  return jsonData;
}

function invalidRoute(response) {
  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ message: "Route Not Found" }));
}

module.exports = {
  getIdParam,
  parseURLParameters,
  invalidRoute,
};
