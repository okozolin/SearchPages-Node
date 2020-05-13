const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    const {
      query: { search },
      pages,
    } = req;
    console.log(
      "does pages exist? --",
      pages.length > 0,
      "pages.length = ",
      pages.length
    );
    let output = `
      <a href="/">Back</a>\n
      <h2>The  string is "${search}"</h2>\n\n
      `;
    if (search && pages.length > 0) {
      for (let link of pages) {
        const { url, title, pageContent } = link;
        if (pageContent.includes(search)) {
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
      console.log("got through if inside users");
      res.setHeader("content-type", "text/html");
      res.send(output);
    } else {
      res.redirect(301, "/");
      // console.log(
      //   "not suppose to be here - search && pages.length",
      //   search,
      //   pages.length
      // );
      // res.send("not suppose to be here");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
