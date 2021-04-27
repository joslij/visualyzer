const {
  getSupportedCategories,
} = require("../services/visual/visual.categories");

getCategories = (req, res) => {
  res.json(getSupportedCategories());
};

module.exports = {
  getCategories,
};
