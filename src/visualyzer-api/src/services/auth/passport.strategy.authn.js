/*
 * Create `login` and `register` strategies using passport-local
 */

const passport = require("passport");
const { Strategy } = require("passport-local");
const { StatusCodes } = require("http-status-codes");

const { response: responseModel } = require("../../models/response.model");

const {
  getByEmail: getUserByEmail,
  getByCredentials: getUserByCredentials,
  create: createUser,
} = require("../../db/user");

const strategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

passport.use(
  "login",
  new Strategy(strategyOptions, async (req, email, password, done) => {
    const getUserResponse = await getUserByCredentials(email, password);
    const hasUser = getUserResponse.data != null;
    return done(null, hasUser, getUserResponse);
  })
);

passport.use(
  "register",
  new Strategy(strategyOptions, async (req, email, password, done) => {
    const getUserResponse = await getUserByEmail(email);
    if (getUserResponse.data) {
      return done(
        null,
        false,
        responseModel({
          statusCode: StatusCodes.CONFLICT,
          message: "Email is in use",
        })
      );
    }
    const createUserResponse = await createUser(req.body);
    const hasUser = createUserResponse.data != null;
    return done(null, hasUser, createUserResponse);
  })
);
