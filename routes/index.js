const express = require("express");
const router = express.Router();
const axios = require("axios");

const Cache = require("../src/cache");
const bookmarksParse = require("../src/bookmarksParse");

/* GET home page. */
router.get("/", async function (req, res, next) {
  // const getPages = async () => {
  //   let bookmarks = "";
  //   if (!bookmarks) {
  //     bookmarks = await bookmarksParse();
  //   }
  //
  //   return ;
  // };
  // const pages = await getPages();

  // let bookmarks ={}
  const bookmarks = await bookmarksParse();
  // bookmarks = !bookmarks ? await bookmarksParse() : bookmarks;

  const getData = async () => {
    let response,
      data,
      pages = [];
    for (let link of bookmarks) {
      // console.log("link", link);
      let { url, title } = link;
      response = await axios.get(url);
      data = response.data;
      pages.push({ url, title, content: data });
    }
    return pages;
  };

  console.log("inside user/get");
  if (!Cache.has("pages") || Cache.isExpired("pages", 7)) {
    // const response = await getData();
    console.log("response:");
    //   Cache.set("pages", response);
  }

  // res.locals.pages = Cache.get("pages");
  // console.log("res.locals", res.locals);
  res.sendFile("home.html", { title: "Orit" });
});

module.exports = router;
