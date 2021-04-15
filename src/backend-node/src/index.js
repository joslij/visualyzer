const express = require("express");
require("dotenv").config();
const categoriesRoute = require("./controllers/categories");
const imageAnalysisApi = require("./analysis/imageAnalysis");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Visualyzer!",
  });
});

app.use("/api", categoriesRoute);
app.use("/api", imageAnalysisApi);

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
