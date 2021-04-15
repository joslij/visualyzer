const express = require("express");
const dotenvConfig = require("dotenv").config();
const placesApi = require("./controllers/places");
const animalsApi = require("./controllers/animals");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Visualyzer!",
  });
});

app.use("/api", placesApi);
app.use("/api", animalsApi);

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
