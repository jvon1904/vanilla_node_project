function getIdParam(path) {
  return path.split("/").slice(-1).pop();
}

function invalidRoute(response) {
  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ message: "Route Not Found" }));
}

module.exports = {
  getIdParam,
  invalidRoute,
};
