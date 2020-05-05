const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", function (req, res, next) {
  res.sendFile(
    "index.html",
    { root: path.join(__dirname, "../public") },
    function (err) {
      if (err) {
        next(err);
      } else {
        console.log("Sent file");
      }
    }
  );
});

module.exports = router;
