const {
  ComputerVisionClient,
} = require("@azure/cognitiveservices-computervision");
const { ApiKeyCredentials } = require("@azure/ms-rest-js");
const { getConfigValue } = require("../helpers/ConfigHelper");
const { Router } = require("express");

const imageAnalysisRouter = Router();

const getSubscriptionKey = getConfigValue(
  process.env.COMPUTER_VISION_SUBSCRIPTION_KEY
);

const analyzeImage = async (computervisionSubcriptionKey) => {
  const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({
      inHeader: { "Ocp-Apim-Subscription-Key": computervisionSubcriptionKey },
    }),
    process.env.COMPUTER_VISION_API_ANALYZE_ENDPOINT
  );

  const categoryURLImage =
    "https://nualalobley.files.wordpress.com/2017/12/img_0186-1.jpg?w=924&h=0&crop=1";

  const imageResponse = await computerVisionClient.analyzeImage(
    categoryURLImage,
    {
      visualFeatures: ["Categories", "Description", "Tags"],
      details: ["Celebrities", "Landmarks"],
      language: "en",
    }
  );
  return imageResponse;
};

imageAnalysisRouter.get("/images", async (req, res) => {
  let responseData = {};
  await getSubscriptionKey
    .then((value) => {
      return analyzeImage(value);
    })
    .then((imageResponse) => {
      responseData = imageResponse;
    })
    .catch((error) => console.error(error.message));
  console.log(process.env.NODE_ENV);

  res.json(responseData);
});

module.exports = imageAnalysisRouter;
