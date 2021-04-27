const express = require("express");

const { authorizeUser } = require("../middlewares/authz.middleware");
const {
  getCategories,
  getAnalytics,
} = require("../controllers/visual.controller");

const visualRouter = express.Router();

visualRouter.get("/visual/categories", getCategories);
visualRouter.post("/visual/analyze", authorizeUser, getAnalytics);

module.exports = visualRouter;
