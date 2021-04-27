const { StatusCodes } = require("http-status-codes");
const {
  ComputerVisionClient,
} = require("@azure/cognitiveservices-computervision");
const { ApiKeyCredentials } = require("@azure/ms-rest-js");

const { getModelFromAnalysisData } = require("../../models/visual.model");
const { response: responseModel } = require("../../models/response.model");
const { getConfigValue } = require("../../helpers/config.helper");

let computervisionSubcriptionKey = null;
let computerVisionClient = null;

const initialize = async () => {
  if (!computervisionSubcriptionKey) {
    computervisionSubcriptionKey = await getConfigValue(
      process.env.COMPUTER_VISION_SUBSCRIPTION_KEY
    );
  }
  computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({
      inHeader: { "Ocp-Apim-Subscription-Key": computervisionSubcriptionKey },
    }),
    process.env.COMPUTER_VISION_API_ANALYZE_ENDPOINT
  );
};

const getAnalyticsFromURL = async ({ url }) => {
  let response = null;

  try {
    await initialize();

    const analysisData = await computerVisionClient.analyzeImage(url, {
      visualFeatures: ["Categories", "Description", "Tags"],
      details: ["Celebrities", "Landmarks"],
      language: "en",
    });

    const visualModel = getModelFromAnalysisData(false, analysisData);

    response = responseModel({
      data: visualModel,
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    response = responseModel({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }

  return response;
};

module.exports = {
  getAnalyticsFromURL,
};
