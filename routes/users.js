var express = require("express");
var router = express.Router();
// var https = require("https");
const axios = require("axios");

const url1 = "https://jsonplaceholder.typicode.com/posts/1";
const url2 =
  "https://www.bvd.co.il/%d7%a2%d7%99%d7%a6%d7%95%d7%91-%d7%97%d7%93%d7%a8%d7%99%d7%9d-%d7%a2%d7%99%d7%a6%d7%95%d7%91-%d7%97%d7%93%d7%a8-%d7%a2%d7%99%d7%a6%d7%95%d7%91-%d7%97%d7%93%d7%a8%d7%99-%d7%94%d7%91%d7%99%d7%aa/%d7%a2%d7%99%d7%a6%d7%95%d7%91-%d7%97%d7%93%d7%a8%d7%99-%d7%a9%d7%99%d7%a0%d7%94-%d7%9b%d7%9c-%d7%9e%d7%94-%d7%a9%d7%9b%d7%93%d7%90%d7%99-%d7%9c%d7%93%d7%a2%d7%aa/%d7%94%d7%9b%d7%9c-%d7%91%d7%97%d7%93%d7%a8-%d7%90%d7%97%d7%93-%d7%a2%d7%99%d7%a6%d7%95%d7%91-%d7%a1%d7%95%d7%95%d7%99%d7%98%d7%aa-%d7%a9%d7%99%d7%a0%d7%94-%d7%aa%d7%9c-%d7%90%d7%91%d7%99%d7%91%d7%99/";

/* GET users listing. */

router.get("/", function (req, res, next) {
  // res.send("respond with a resource");
  console.log("req.params", req.params);
  console.log("req.body", req.body);
  const { search } = req.query;
  console.log("req.query - search", search);
  const getData = async (url) => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      // console.log(data);
      // res.setHeader("content-type", "text/html");
      res.setHeader("content-type", "text/plain");
      // res.send(data);
      res.send(`your search string is: ${search}`);
    } catch (error) {
      console.log(error);
    }
  };

  getData(url2);
  // respond to request
  // res.setHeader("content-type", "text/plain");

  // res.end("hello, world!");
  // res.send("http://www.google.com");
});

module.exports = router;
