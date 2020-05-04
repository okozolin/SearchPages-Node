const express = require("express");
const router = express.Router();
var path = require("path");
const axios = require("axios");

const Cache = require("../src/cache");
const bookmarksParse = require("../src/bookmarksParse");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const bookmarks = await bookmarksParse();

  const getData = async () => {
    let response,
      data,
      counter = 1;
    let pages = [];
    for (let link of bookmarks) {
      // console.log("link", link, counter++);
      let { url, title } = link;
      response = await axios.get(url);
      data = response.data;
      pages.push({ url, title, pageContent: data });
    }
    return pages;
  };

  // if (!Cache.has("pages") || Cache.isExpired("pages", 7)) {
  //   const response = await getData();
  //   console.log("response:");
  //   Cache.set("pages", response);
  // }

  // res.locals.pages = Cache.get("pages");
  // console.log("res.locals", res.locals);

  res.sendFile(
    "index.html",
    { root: path.join(__dirname, "../public") },
    function (err) {
      if (err) {
        next(err);
      } else {
        console.log("Sent file");
      }
    }
  );
});

module.exports = router;
