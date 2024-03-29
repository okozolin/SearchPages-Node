const { readFile } = require("fs").promises;
const $ = require("cheerio");
const path = require("path");

const publicDir = path.join(__dirname, "../public");
const filePath = path.join(publicDir, "bookmarks.html");

const parsedFile = (html) => {
  const listLen = $("dt > a", html).length;
  const urls = [];
  let elm = "";
  for (let i = 0; i < listLen; i++) {
    elm = $("dt > a", html)[i];
    urls.push({
      url: elm.attribs.href,
      title: elm.children[0].data.replace(/\s\s+/g, " "), // remove also more then one cpace and newline
    });
  }
  return urls;
};

const bookmarksParse = async function () {
  console.log("this is bookmarksParse");
  try {
    const file = await readFile(filePath, "utf8");
    return parsedFile(file);
  } catch (err) {
    console.error(err);
  }
};

module.exports = bookmarksParse;
