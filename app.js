const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const Cache = require("./src/cache");
const getPages = require("./src/getPagesService");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const getPagesMiddlware = async (req, res, next) => {
  if (!Cache.has("pages") || Cache.isExpired("pages", 20)) {
    const response = await getPages();
    console.log("getPagesMiddlware response:");
    Cache.set("pages", response);
  }
  next();
};

const cacheGetMiddleware = (req, res, next) => {
  req.pages = Cache.get("pages");
  next();
  return;
};

app.use("/", indexRouter, getPagesMiddlware);
app.use("/users", cacheGetMiddleware, usersRouter);
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
