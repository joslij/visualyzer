const express = require("express");

const { login, register } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/auth/login", login);
authRouter.post("/auth/register", register);

module.exports = authRouter;
