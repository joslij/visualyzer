const express = require("express");
const { StatusCodes } = require("http-status-codes");

const passportJWT = require("../services/auth/passport.strategy.authz");

const responseHandler = (req, res, next, user, responseObject) => {
  try {
    if (user) {
      return next();
    } else {
      if (responseObject?.statusCode) {
        res.status(responseObject.statusCode).json(responseObject);
      } else {
        res.status(StatusCodes.FORBIDDEN).json({
          message: "Request failed - ensure valid token is provided",
        });
      }
    }
  } catch (error) {
    res.status(StatusCodes.FORBIDDEN).json({
      message: "Request failed - ensure valid token is provided",
    });
  }
};

const authorizeUser = async (req, res, next) => {
  const authenticate = passportJWT.authenticate(
    "authorize-user",
    { session: false },
    async (error, user, responseObject) => {
      responseHandler(req, res, next, user, responseObject);
    }
  );
  authenticate(req, res, next);
};

const authorizeAdmin = async (req, res, next) => {
  const authenticate = passportJWT.authenticate(
    "authorize-admin",
    { session: false },
    async (error, user, responseObject) => {
      responseHandler(req, res, next, user, responseObject);
    }
  );
  authenticate(req, res, next);
};

module.exports = {
  authorizeUser,
  authorizeAdmin,
};
