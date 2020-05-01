var express = require("express");
var router = express.Router();
const axios = require("axios");
const fs = require("fs");
const bookmarksParse = require("../src/bookmarksParse");
const url1 = "https://jsonplaceholder.typicode.com/posts/1";
const url2 =
  "https://www.bvd.co.il/%d7%a2%d7%99%d7%a6%d7%95%d7%91-%d7%97%d7%93%d7%a8%d7%99%d7%9d-%d7%a2%d7%99%d7%a6%d7%95%d7%91-%d7%97%d7%93%d7%a8-%d7%a2%d7%99%d7%a6%d7%95%d7%91-%d7%97%d7%93%d7%a8%d7%99-%d7%94%d7%91%d7%99%d7%aa/%d7%a2%d7%99%d7%a6%d7%95%d7%91-%d7%97%d7%93%d7%a8%d7%99-%d7%a9%d7%99%d7%a0%d7%94-%d7%9b%d7%9c-%d7%9e%d7%94-%d7%a9%d7%9b%d7%93%d7%90%d7%99-%d7%9c%d7%93%d7%a2%d7%aa/%d7%94%d7%9b%d7%9c-%d7%91%d7%97%d7%93%d7%a8-%d7%90%d7%97%d7%93-%d7%a2%d7%99%d7%a6%d7%95%d7%91-%d7%a1%d7%95%d7%95%d7%99%d7%98%d7%aa-%d7%a9%d7%99%d7%a0%d7%94-%d7%aa%d7%9c-%d7%90%d7%91%d7%99%d7%91%d7%99/";

//  Get urls to search in
// (async () => {
//   const bookmarks = await bookmarksParse();
//   console.log("XX--got the bookmarks");
//   console.log("XX--bookmarks", bookmarks);
// })().catch((err) => console.error(err));

/* GET users search string */
router.get("/", function (req, res, next) {
  // res.send("respond with a resource");
  const { search } = req.query;
  const getData = async () => {
    let response,
      data,
      output = `<h2>The search string is "${search}"</h2>\n\n`;
    try {
      if (search) {
        const bookmarks = await bookmarksParse();
        // console.log("XX--bookmarks", bookmarks);
        for (let link of bookmarks) {
          console.log("link", link);
          response = await axios.get(link.url);
          data = response.data;
          if (data.includes(search)) {
            output += `
            <ul>
              <li>
                <a href="${link.url}">
                  ${link.title}
                </a>
              </li>
            </ul>\n`;
          }
        }
        res.setHeader("content-type", "text/html");
        res.send(output);
      } else {
        res.redirect(301, "/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  getData();
});

module.exports = router;
