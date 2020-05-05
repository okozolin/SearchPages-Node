const express = require("express");
const usersRouter = express.Router();

function router(pages) {
  usersRouter.route("/").get((req, res, next) => {
    try {
      const { search } = req.query;
      let output = `
      <a href="/">Back</a>\n
      <h2>The search string is "${search}"</h2>\n\n
      `;
      if (search && pages) {
        console.log("got pages in users");
        // for (let link of pages) {
        //   console.log("link", link);
        //   const { url, title, content } = pages;
        //   if (content.includes(search)) {
        //     output += `
        //       <ul>
        //         <li>
        //           <a href="${url}">
        //             ${title}
        //           </a>
        //         </li>
        //       </ul>\n`;
        //   }
        // }
        // res.setHeader("content-type", "text/html");
        // res.send(output);
        res.send("got through if inside users");
      } else {
        // res.redirect(301, "/");
        res.send("not suppose to be here");
      }
    } catch (error) {
      console.log(error);
    }
  });
  return usersRouter;
}

module.exports = router;
