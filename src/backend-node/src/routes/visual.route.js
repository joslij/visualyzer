const express = require("express");

const { getCategories } = require("../controllers/visual.controller");

const visualRouter = express.Router();

visualRouter.get("/visual/categories", getCategories);

module.exports = visualRouter;
