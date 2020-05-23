const { readFile } = require("fs").promises;
const $ = require("cheerio");
const path = require("path");

const publicDir = path.join(__dirname, "../public");
const filePath = path.join(publicDir, "bookmarks.html");

const parsedFile = (html) => {
  const listLen = $("dt > a", html).length; // You use here jQuery which is old fashion. I would suggest to replace it with querySelector
  const urls = [];                          // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
  let elm = "";
  for (let i = 0; i < listLen; i++) { //listLen convention, 
    elm = $("dt > a", html)[i];
    urls.push({
      url: elm.attribs.href,
      title: elm.children[0].data.replace(/\s\s+/g, " "), // remove also more then one cpace and newline
    });
  }
  return urls;
};

const bookmarksParse = async function () {
  console.log("This is bookmarksParse");
  try {
    const file = await readFile(filePath, "utf8");
    return parsedFile(file);
  } catch (err) {
    console.error(err);
  }
};

module.exports = bookmarksParse;
