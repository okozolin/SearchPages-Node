var express = require("express");
var router = express.Router();
const axios = require("axios");
const bookmarksParse = require("../src/bookmarksParse");

/* GET users search string */
router.get("/", function (req, res, next) {
  const { search } = req.query;
  const getData = () => {
    let output = `
      <a href="/">Back</a>\n
      <h2>The search string is "${search}"</h2>\n\n
      `;
    try {
      if (search) {
        // const bookmarks = await bookmarksParse();
        // console.log("XX--bookmarks", bookmarks);
        const { pages } = res.locals;
        for (let link of pages) {
          console.log("link", link);
          // response = await axios.get(link.url);
          // data = response.data;
          const { url, title, content } = pages;
          if (content.includes(search)) {
            output += `
            <ul>
              <li>
                <a href="${url}">
                  ${title}
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
