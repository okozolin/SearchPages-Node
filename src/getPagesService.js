const axios = require("axios");
const fs = require("fs");
const { access, readFile } = fs.promises;
const { Readable, Transform } = require("stream");

const path = require("path");
const bookmarksParse = require("./bookmarksParse");

const publicDir = path.join(__dirname, "../public");
const filePath = path.join(publicDir, "pagesstream.json");

// STREAMS
// ---------------------------------
let pagesStream = new Readable({
  objectMode: true,
  read() {},
});

const stringifyTransform = new Transform({
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk) + "\n");
    callback();
  },
});
const parseTransform = new Transform({
  // writableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(JSON.parse(chunk) + "\n");
    callback();
  },
});

// -------------
const pagesFileExist = (filepath) => {
  return new Promise((resolve, reject) => {
    access(filepath, fs.constants.R_OK | fs.constants.W_OK)
      .then(() => {
        console.log("The file exists");
        resolve(true);
      })
      .catch(() => {
        console.error("The file does not exist");
        resolve(false);
      });
  });
};

const getPages = async () => {
  const exist = await pagesFileExist(filePath);
  console.log("pagesFileExist", exist);

  let pages = [];
  if (exist) {
    // const src = fs.createReadStream(filePath, { encoding: "utf8" });
    // src.pipe(parseTransform);
    let counter = 1;
    const file = await readFile(filePath, "utf8");
    const fileSplit = file.split("\n");
    fileSplit.pop(); //remove the last item , it is redundant

    for (let link of fileSplit) {
      page = JSON.parse(link);
      console.log(counter++);
      // data = response.data;
      pages.push(page);
    }
    return pages;
  } else {
    let response, data;
    let counter = 1;

    const bookmarks = await bookmarksParse();

    for (let link of bookmarks) {
      let { url, title } = link;
      response = await axios.get(url);
      console.log(counter++);
      // data = response.data;
      pages.push({ url, title, pageContent: data });
      pagesStream.push({ url, title, pageContent: response.data });
    }
    pagesStream.push(null);
    console.log("pages.length: ", pages.length);
    console.log("pagesStream.length: ", pagesStream.length);
    const writePagesToFileStream = fs.createWriteStream(filePath);
    pagesStream.pipe(stringifyTransform).pipe(writePagesToFileStream);

    // await savePagesToFile(filePath, pages);
    return pages;
  }
};

module.exports = getPages;
