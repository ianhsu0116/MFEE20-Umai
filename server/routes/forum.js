require("dotenv").config();
const mysql = require("mysql");
const Promise = require("bluebird");
const bodyParser = require("body-parser");
const connection = require("../utils/database");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

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

router.post("/insertArticle", upload.array(), async (req, res) => {
  console.log("body", req.body);
  // try {
  //   let forumdatadetail = await connection.queryAsync(
  //     "INSERT INTO forum_article(member_id,category_id,article_title,article_text,image_name,created_time,valid)VALUES(?,?,?,?,?,?,?),()"
  //   );
  //   console.log(forumdatadetail);
  //   res.json({ forumdatadetail: forumdatadetail });
  // } catch (error) {
  //   console.log(error);
  //   res.json({ error: error });
  // }
});

module.exports = router;
