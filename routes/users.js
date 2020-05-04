var express = require("express");
var router = express.Router();
const axios = require("axios");
const bookmarksParse = require("../src/bookmarksParse");

/* GET users search string and pages data */
router.get("/", function (req, res, next) {
  try {
    const { search } = req.query;
    let output = `
      <a href="/">Back</a>\n
      <h2>The search string is "${search}"</h2>\n\n
      `;
    if (search) {
      const { pages } = res.locals;
      for (let link of pages) {
        console.log("link", link);
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
});

module.exports = router;
