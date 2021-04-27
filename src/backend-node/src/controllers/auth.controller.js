const passport = require("passport");
require("../services/auth/passport.strategy.authn.js");

const { generateToken } = require("../helpers/jwt.helper");

const login = async (req, res, next) => {
  try {
    const authenticate = passport.authenticate(
      "login",
      { session: false },
      async (error, user, responseObject) => {
        let response = responseObject;
        if (!error && user) {
          response.token = generateToken(responseObject.data);
        }
        res.status(response.statusCode).json(response);
      }
    );

    await authenticate(req, res, next);
  } catch (error) {
    console.log("Login error", error);
  }
};

const register = async (req, res, next) => {
  try {
    const authenticate = passport.authenticate(
      "register",
      { session: false },
      async (error, user, response) => {
        if (user) {
          response.token = generateToken(response.data);
        }
        res.status(response.statusCode).json(response);
      }
    );

    await authenticate(req, res, next);
  } catch (error) {
    console.log("Registration error", error);
  }
};

module.exports = {
  login,
  register,
};
