const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const Cache = require("./src/cache");
const getPages = require("./src/getPagesService");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// let pages=""
// app.use(function (req, res, next) {
//   console.log("inside app use")
//   // const cexpired = Cache.isExpired("pages", 7)
//   // console.log("Cache.isExpired(pages, 7)---", cexpired)
//   if (!Cache.has("pages" || Cache.isExpired("pages", 20))) {
//   // if (!Cache.has("pages")) {
//     const response = "await getPages()";
//     console.log("app cache response:", response);
//     Cache.set("pages", response);
//   }
//   pages = Cache.get("pages")
//   console.log("pages inside app.use", pages)
//   next()
// })
function test() {
  let pages;
  console.log("inside function test");
  if (!Cache.has("pages" || Cache.isExpired("pages", 20))) {
    const response = "--await getPages()---";
    console.log("app cache response:", response);
    Cache.set("pages", response);
  }
  pages = Cache.get("pages");
  console.log("pages inside function test", pages);
  return pages;
}
// let pages = "--the pages content--";
let pages = test();

app.use("/", indexRouter);
let usersRouter = require("./routes/users")(pages);

app.use("/users", usersRouter);
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
