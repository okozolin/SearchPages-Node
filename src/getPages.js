const axios = require("axios");

const bookmarksParse = require("../src/bookmarksParse");

const getPages = async () => {
  let response,
    data,
    counter = 1;
  let pages = [];
  const bookmarks = await bookmarksParse();

  for (let link of bookmarks) {
    console.log(counter++);
    let { url, title } = link;
    response = await axios.get(url);
    data = response.data;
    pages.push({ url, title, pageContent: data });
  }
  return pages;
};

module.exports = getPages;
