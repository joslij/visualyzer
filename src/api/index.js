require("dotenv").config();
const http = require("http");
const app = require("./app/app");

const ENV = process.env.NODE_ENV;
const PORT = ENV.trim() === "production" ? process.env?.PORT ?? 80 : 3000;

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} in ${ENV} mode`);
});
