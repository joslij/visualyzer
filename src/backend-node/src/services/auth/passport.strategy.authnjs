/*
 * Create `login` and `register` strategies using passport-local
 */

const passport = require("passport");
const { Strategy } = require("passport-local");

const {
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
    const serviceResponse = await getUserByCredentials(email, password);
    const hasUser = serviceResponse.data != null;
    return done(null, hasUser, serviceResponse);
  })
);

passport.use(
  "register",
  new Strategy(strategyOptions, async (req, email, password, done) => {
    const serviceResponse = await createUser(req.body);
    const hasUser = serviceResponse.data != null;
    return done(null, hasUser, serviceResponse);
  })
);
