const axios = require("axios");
const fs = require("fs");
const { writeFile, access, readFile } = require("fs").promises;
const path = require("path");
const bookmarksParse = require("./bookmarksParse");

const publicDir = path.join(__dirname, "../public");
const filePath = path.join(publicDir, "pages.json");

const pagesFileExist = (filepath) => {
  return new Promise((resolve, reject) => {
    access(filepath, fs.constants.R_OK | fs.constants.W_OK)
      .then(() => {
        console.log("The file exists. value  is : ");
        resolve(true);
      })
      .catch(() => {
        console.error("The file does not exist. value  is : ");
        resolve(false);
      });
  });
};

const savePagesToFile = async function (filepath, pages) {
  try {
    console.log("saving pages to file");
    const sliced = pages.slice(0, 4); // for dev purposes, the file is too large for JSON.stringify . need to solve this
    const jsonContent = JSON.stringify(sliced);
    // const jsonContent = JSON.stringify(pages);
    console.log("------XXX-----pages");
    await writeFile(filepath, jsonContent);
    console.log("savePagesToFile output after write file");
  } catch (err) {
    console.error(err);
  }
};

const getPages = async () => {
  const exist = await pagesFileExist(filePath);
  console.log("pagesFileExist", exist);
  let pages = [];
  if (exist) {
    const file = await readFile(filePath, "utf8");
    pages = JSON.parse(file);
    return pages;
  } else {
    let response, data;
    let counter = 1;

    const bookmarks = await bookmarksParse();

    for (let link of bookmarks) {
      let { url, title } = link;
      response = await axios.get(url);
      console.log(counter++);
      data = response.data;
      pages.push({ url, title, pageContent: data });
    }
    await savePagesToFile(filePath, pages);
    return pages;
  }
};

module.exports = getPages;
