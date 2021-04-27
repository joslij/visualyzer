const express = require("express");

const { authorizeAdmin } = require("../middlewares/authz.middleware");
const { getUserById, getAllUsers } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/user/:id", authorizeAdmin, getUserById);
userRouter.get("/user", authorizeAdmin, getAllUsers);

module.exports = userRouter;
