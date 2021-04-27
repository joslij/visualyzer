const { StatusCodes } = require("http-status-codes");
const {
  getSupportedCategories,
} = require("../services/visual/visual.categories");

const { getAnalyticsFromURL } = require("../services/visual/visual.analysis");

const getCategories = (req, res) => {
  const response = getSupportedCategories();
  res.status(response.statusCode).json(response);
};

const getAnalytics = async (req, res) => {
  try {
    const analysisResponse = await getAnalyticsFromURL(req.body);
    res.status(analysisResponse.statusCode).json(analysisResponse);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  getAnalytics,
};
