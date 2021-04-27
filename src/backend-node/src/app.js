const express = require("express");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("passport");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const visualRoute = require("./routes/visual.route");
// const imageAnalysisApi = require("./analysis/imageAnalysis");

// ---- Configurations ----

// ---- Application definition ----
const app = express();

// ---- Middleware definition ----
// :for securing api endpoints
app.use(helmet());
// :for parsing URL encoded data in bodies
app.use(bodyparser.urlencoded({ extended: false }));
// :for parsing incoming request bodies to JSON
app.use(bodyparser.json());
// :for parsing cookies from the HTTP request
app.use(cookieParser());
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
