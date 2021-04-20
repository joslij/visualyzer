const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

require("dotenv").config();

const categoriesRoute = require("./controllers/categories");
const imageAnalysisApi = require("./analysis/imageAnalysis");

// ---- Application definition ----
const app = express();

// ---- Middleware definition ----
// :for securing api endpoints
app.use(helmet());
// :for parsing URL encoded data
app.use(bodyparser.urlencoded({ extended: false }));
// :for parsing incoming request bodies to JSON
app.use(bodyparser.json());
// :for enabling requests from other origins
app.use(cors());
// :for logging HTTP requests
app.use(morgan("combined"));

// ---- Endpoints definition ----
// :for base url request
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Visualyzer!",
  });
});
// :for api/categories requests
app.use("/api", categoriesRoute);
// :for api/images requests
app.use("/api", imageAnalysisApi);

// ---- Server definition ----
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
