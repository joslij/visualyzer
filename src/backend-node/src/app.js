const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const visualRoute = require("./routes/visual.route");

// ---- Application definition ----
const app = express();

// ---- Middleware definition ----
// :for parsing incoming request bodies to JSON
app.use(bodyparser.json());
// :for enabling requests from other origins
app.use(cors());
// :for logging HTTP requests
app.use(morgan("combined"));

// ---- Initializations ----
passport.initialize();

// ---- Endpoints definition ----
// :for base url request
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Visualyzer!",
  });
});
// :for api/auth requests (i.e. register and login)
app.use("/api", authRoute);
// :for api/user requests
app.use("/api", userRoute);
// :for api/visual requests
app.use("/api", visualRoute);

module.exports = app;
