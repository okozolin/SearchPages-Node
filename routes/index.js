const express = require("express");
const router = express.Router();
var path = require("path");
const axios = require("axios");

const Cache = require("../src/cache");
const bookmarksParse = require("../src/bookmarksParse");

/* GET home page. */
router.get("/", function (req, res, next) {
  // const bookmarks = await bookmarksParse();
  // const getData = async () => {
  //   let response,data
  //   let pages = [];
  //   for (let link of bookmarks) {
  //     // console.log("link", link);
  //     let { url, title } = link;
  //     response = await axios.get(url);
  //     data = response.data;
  //     pages.push({ url, title, content: data });
  //   }
  //   return pages;
  // };

  // console.log("inside index/get");
  // if (!Cache.has("pages") || Cache.isExpired("pages", 7)) {
  //   const response = await getData();
  //   console.log("response:");
  //     Cache.set("pages", response);
  // }

  // res.locals.pages = Cache.get("pages");
  // console.log("res.locals", res.locals);
  console.log("inside index-get route, __dirname", __dirname);
  // res.send("inside index-get route");
  res.sendFile(
    "home.html",
    { root: path.join(__dirname, "../public") },
    function (err) {
      if (err) {
        next(err);
      } else {
        console.log("Sent file:");
      }
    }
  );
});

module.exports = router;
