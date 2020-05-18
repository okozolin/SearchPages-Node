const axios = require("axios");
const fs = require("fs");
const { access } = fs.promises;
const { Readable, Transform } = require("stream");

const path = require("path");
const bookmarksParse = require("./bookmarksParse");

const publicDir = path.join(__dirname, "../public");
const filePath = path.join(publicDir, "pagesstream.json");

// CUSTOM STREAMS
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
// -------------

// HELPER FUNCTIONS
// ---------------------------------------
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

async function processLineByLine() {
  let rl = require("readline").createInterface({
    input: fs.createReadStream(filePath),
  });
  let counter = 1;
  let pages = [];

  for await (const line of rl) {
    console.log("line: ", counter++);
    pages.push(JSON.parse(line));
  }
  return pages
}

//------------------------------------------
const getPages = async () => {
  const exist = await pagesFileExist(filePath);
  console.log("pagesFileExist", exist);

  let pages = [];
  if (exist) {
    pages = await processLineByLine();
    return pages;
  } 
  else 
  {
    let response, data;
    let counter = 1;

    const bookmarks = await bookmarksParse();

    for (let link of bookmarks) {
      let { url, title } = link;
      response = await axios.get(url);
      console.log(counter++);
      pages.push({ url, title, pageContent: data });
      pagesStream.push({ url, title, pageContent: response.data });
    }
    
    pagesStream.push(null); // signal end of stream
    const writePagesToFileStream = fs.createWriteStream(filePath);
    pagesStream.pipe(stringifyTransform).pipe(writePagesToFileStream);
    return pages;
  }
};

module.exports = getPages;
