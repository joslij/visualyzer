const { Router } = require("express");
const imageCategories = require("../models/image/cat");

const categoriesRoute = Router();

const excludedCategories = [
  "emtpy",
  "others",
  "abstract",
  "dark",
  "object",
  "text",
  "trans",
];

categoriesRoute.get("/categories", (req, res) => {
  const result = imageCategories
    .filter((item) => {
      return !excludedCategories.includes(item.name);
    })
    .map((item) => item.name)
    .sort();
  res.json(result);
});

module.exports = categoriesRoute;
