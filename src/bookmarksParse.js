const fs = require("fs").promises;
const $ = require("cheerio");
const path = require("path");

const publicDir = path.join(__dirname, "../public");
const filePath = path.join(publicDir, "bookmarks.html");

const parsedFile = (html) => {
  const listlen = $("dt > a", html).length;
  const urls = [];
  for (let i = 0; i < listlen; i++) {
    urls.push({
      url: $("dt > a", html)[i].attribs.href,
      title: $("dt > a", html)[i].children[0].data.replace(/\s\s+/g, " "), // remove also more then one cpace and newline
    });
  }
  return urls;
};

const bookmarksParse = async function () {
  console.log("this is bookmarksParse");
  try {
    const file = await fs.readFile(filePath, "utf8");
    return parsedFile(file);
  } catch (err) {
    console.error(err);
  }
};

module.exports = bookmarksParse;
