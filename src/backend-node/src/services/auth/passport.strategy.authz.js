/*
 * Handles JWT functionalities like retrieving the token, decoding the token
 */

const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const { StatusCodes } = require("http-status-codes");

const { getById: getUserById } = require("../../db/user");
const { response: responseModel } = require("../../models/response.model");

const jwtPublicKey = process.env.JWT_PUBLIC_KEY_VALUE.replace(/\\n/gm, "\n");

const strategyOptions = {
  secretOrKey: jwtPublicKey,
  algorithms: ["RS256"],
  passReqToCallback: true,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
};

passport.use(
  "authorize-user",
  new Strategy(strategyOptions, async (req, payload, done) => {
    let response = null;
    try {
      const userId = payload.id;
      const response = await getUserById(userId);
      const hasUser = response.data != null;

      return done(null, hasUser, response);
    } catch (error) {
      return done(error, false, response);
    }
  })
);

passport.use(
  "authorize-admin",
  new Strategy(strategyOptions, async (req, payload, done) => {
    let response = null;
    try {
      const userId = payload.id;
      const response = await getUserById(userId);
      const isAdmin = response.data && response.data.role === "admin";

      if (isAdmin) {
        return done(null, true, response);
      } else {
        return done(
          null,
          false,
          responseModel({
            data: null,
            statusCode: StatusCodes.FORBIDDEN,
            message: "No access rights",
          })
        );
      }
    } catch (error) {
      return done(error, false, response);
    }
  })
);

module.exports = passport;
