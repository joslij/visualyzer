const express = require("express");

const {
  getCategories,
  getAnalytics,
} = require("../controllers/visual.controller");

const visualRouter = express.Router();

visualRouter.get("/visual/categories", getCategories);
visualRouter.post("/visual/analyze", getAnalytics);

module.exports = visualRouter;
