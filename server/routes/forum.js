require("dotenv").config();
const mysql = require("mysql");
const Promise = require("bluebird");

const connection = require("../utils/database");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let forumdata = await connection.queryAsync("SELECT * FROM forum_article ");
    console.log(forumdata);
    res.json({ forumdata: forumdata });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

router.get("/:fourmId", async (req, res) => {
  try {
    let forumdatadetail = await connection.queryAsync(
      "SELECT * FROM forum_article WHERE id=?",
      [req.params.fourmId]
    );
    console.log(forumdatadetail);
    res.json({ forumdatadetail: forumdatadetail[0] });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

module.exports = router;
