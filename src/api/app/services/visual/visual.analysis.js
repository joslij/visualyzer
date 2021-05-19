const { StatusCodes } = require("http-status-codes");
const {
  ComputerVisionClient,
} = require("@azure/cognitiveservices-computervision");
const { ApiKeyCredentials } = require("@azure/ms-rest-js");

const { getModelFromAnalysisData } = require("../../models/visual.model");
const { response: responseModel } = require("../../models/response.model");
const { getConfigValue } = require("../../helpers/config.helper");
const { create: createVisual } = require("../../db/visual");

let computervisionSubcriptionKey = null;
let computerVisionClient = null;

const initialize = async () => {
  if (!computervisionSubcriptionKey) {
    computervisionSubcriptionKey = await getConfigValue(
      "ComputerVisionSubscriptionKey"
    );
  }
  computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({
      inHeader: { "Ocp-Apim-Subscription-Key": computervisionSubcriptionKey },
    }),
    process.env.AZURE_COMPUTER_VISION_API_ANALYZE_ENDPOINT
  );
};

const getAnalyticsFromURL = async (userId, url, isPublic) => {
  let response = null;

  try {
    await initialize();

    const analysisData = await computerVisionClient.analyzeImage(url, {
      visualFeatures: ["Categories", "Description"],
      details: ["Celebrities", "Landmarks"],
      language: "en",
    });

    const visualModel = getModelFromAnalysisData(
      userId,
      url,
      isPublic,
      analysisData
    );

    response = createVisual(visualModel);
  } catch (error) {
    console.error("Error analyzing image: ", error);
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
