const path = require("path");
const { StatusCodes } = require("http-status-codes");
const {
  getSupportedCategories,
} = require("../services/visual/visual.categories");

const { getAnalyticsFromURL } = require("../services/visual/visual.analysis");
const {
  getAllPublicVisuals,
  getAllPublicVisualsInCategory,
  getAllUserVisuals,
  getAllUserVisualsInCategory,
  getById,
  deleteItem,
  update,
  operationTypes,
} = require("../db/visual");

const getCategories = (req, res) => {
  const response = getSupportedCategories();
  res.status(response.statusCode).json(response);
};

const {
  saveImageToLocalStorage,
  saveImageToAzureStorage,
  deleteImageFromAzureStorage,
} = require("../services/storage/visual.store");

const getAnalytics = async (req, res) => {
  try {
    const { url, share } = req.body;
    const file = req.file;

    if (!url && !file) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Either url or file is expected" });
    } else {
      let fileName,
        filePath = null;
      if (file) {
        fileName = `${file.filename}${path.extname(file.originalname)}`;
        filePath = path.resolve(file.path);
      } else {
        ({ fileName, filePath } = await saveImageToLocalStorage(url));
      }

      const imageUrl = await saveImageToAzureStorage(fileName, filePath, true);

      const analysisResponse = await getAnalyticsFromURL(
        res.locals.user.id,
        imageUrl,
        share == true || share == "true" ? true : false
      );

      if (analysisResponse.statusCode !== StatusCodes.CREATED) {
        await deleteImageFromAzureStorage(fileName);
      }

      res.status(analysisResponse.statusCode).json(analysisResponse);
    }
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getPublicVisuals = async (req, res) => {
  const response = await getAllPublicVisuals();
  res.status(response.statusCode).json(response);
};

const getPublicVisualsInCategory = async (req, res) => {
  const categoryName = req.params.categoryName;

  const response = categoryName
    ? await getAllPublicVisualsInCategory(categoryName)
    : await getAllPublicVisuals();
  res.status(response.statusCode).json(response);
};

const getUserVisuals = async (req, res) => {
  const userId = res.locals.user.id;
  const response = await getAllUserVisuals(userId);
  res.status(response.statusCode).json(response);
};

const getUserVisualsInCategory = async (req, res) => {
  const categoryName = req.params.categoryName;

  const response = categoryName
    ? await getAllUserVisualsInCategory(res.locals.user.id, categoryName)
    : await getAllUserVisuals(res.locals.user.id);
  res.status(response.statusCode).json(response);
};

const getUserVisualDetails = async (req, res) => {
  const visualId = req.params.visualId;
  const userId = res.locals.user.id;
  const response = await getById(visualId, userId);
  res.status(response.statusCode).json(response);
};

const getPublicVisualDetails = async (req, res) => {
  const visualId = req.params.visualId;
  const response = await getById(visualId);

  if (response.data && !response.data.isPublic) {
    res.status(StatusCodes.FORBIDDEN).json({ message: "Not allowed" });
  } else {
    res.status(response.statusCode).json(response);
  }
};

const likeVisual = async (req, res) => {
  const visualId = req.params.visualId;
  const userId = res.locals.user.id;
  const response = await update(visualId, userId, operationTypes.like);
  res.status(response.statusCode).json(response);
};

const dislikeVisual = async (req, res) => {
  const visualId = req.params.visualId;
  const userId = res.locals.user.id;
  const response = await update(visualId, userId, operationTypes.dislike);
  res.status(response.statusCode).json(response);
};

const toggleVisualShare = async (req, res) => {
  const visualId = req.params.visualId;
  const userId = res.locals.user.id;
  const response = await update(visualId, userId, operationTypes.toggleShare);
  res.status(response.statusCode).json(response);
};

const addComment = async (req, res) => {
  const visualId = req.params.visualId;
  const userId = res.locals.user.id;
  const commentText = req.body.text;

  const response = await update(
    visualId,
    userId,
    operationTypes.addComment,
    commentText
  );
  res.status(response.statusCode).json(response);
};

const deleteVisual = async (req, res) => {
  const visualId = req.params.visualId;
  const userId = res.locals.user.id;

  let response = await getById(visualId, userId);
  if (response?.data) {
    const fileToDelete = path.basename(response.data.url);

    response = await deleteItem(visualId, userId);

    if (response.statusCode === StatusCodes.NO_CONTENT) {
      await deleteImageFromAzureStorage(fileToDelete);
    }
  } else {
    response.statusCode = StatusCodes.NOT_FOUND;
    response.data = null;
    response.message = `${response.message}. Please make sure that you are the owner of this image.`;
  }

  res.status(response.statusCode).json(response);
};

module.exports = {
  getCategories,
  getAnalytics,
  getPublicVisuals,
  getPublicVisualsInCategory,
  getUserVisuals,
  getUserVisualsInCategory,
  getUserVisualDetails,
  getPublicVisualDetails,
  likeVisual,
  dislikeVisual,
  toggleVisualShare,
  addComment,
  deleteVisual,
};
