const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { authorizeUser } = require("../middlewares/authz.middleware");
const {
  getCategories,
  getAnalytics,
  getPublicVisuals,
  getPublicVisualsInCategory,
  getUserVisuals,
  getUserVisualsInCategory,
  getPublicVisualDetails,
  getUserVisualDetails,
  likeVisual,
  dislikeVisual,
  toggleVisualShare,
  addComment,
  deleteVisual,
} = require("../controllers/visual.controller");

const visualRouter = express.Router();

visualRouter.get("/visuals/categories", getCategories);

visualRouter.get("/visuals/", getPublicVisuals);
visualRouter.get("/visuals/category/:categoryName", getPublicVisualsInCategory);
visualRouter.get("/visuals/:visualId/details", getPublicVisualDetails);

visualRouter.post(
  "/visuals/analyze",
  authorizeUser,
  upload.single("file"),
  getAnalytics
);

visualRouter.get("/visuals/user", authorizeUser, getUserVisuals);
visualRouter.get(
  "/visuals/user/category/:categoryName",
  authorizeUser,
  getUserVisualsInCategory
);
visualRouter.get(
  "/visuals/user/:visualId/details",
  authorizeUser,
  getUserVisualDetails
);
visualRouter.patch("/visuals/:visualId/like", authorizeUser, likeVisual);
visualRouter.patch("/visuals/:visualId/dislike", authorizeUser, dislikeVisual);
visualRouter.patch(
  "/visuals/:visualId/share",
  authorizeUser,
  toggleVisualShare
);
visualRouter.patch("/visuals/:visualId/comment", authorizeUser, addComment);
visualRouter.delete("/visuals/:visualId", authorizeUser, deleteVisual);

module.exports = visualRouter;
