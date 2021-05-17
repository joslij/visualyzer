const express = require("express");

const {
  authorizeAdmin,
  authorizeUser,
} = require("../middlewares/authz.middleware");
const {
  getUserById,
  getMyProfile,
  getAllUsers,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/user/:id", authorizeAdmin, getUserById);
userRouter.get("/user/:id/me", authorizeUser, getMyProfile);
userRouter.get("/user", authorizeAdmin, getAllUsers);

module.exports = userRouter;
