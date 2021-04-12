//const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const session = require("express-session");

const indexRouter = require("./routes/index");
const myAuth = require("./auth/MyAuth.js");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
myAuth.setupPassport(app);
app.use(express.static(path.join(__dirname, "frontendfoodsearchapp/build")));

app.use("/", myAuth.authRouter());
app.use("/", indexRouter);

module.exports = app;
