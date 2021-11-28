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
  res.json({ result: "okok" });
  try {
    let forumdatadetail = await connection.queryAsync(
      "INSERT INTO forum_article (image_name,category_id,course_name,article_title,article_link,article_text) VALUES (?)",
      [
        [
          filename,
          req.body.category_id,
          req.body.course_name,
          req.body.article_title,
          req.body.article_link,
          req.body.article_text,
        ],
      ]
    );
    console.log(forumdatadetail);
    res.json({ forumdatadetail: forumdatadetail });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

module.exports = router;
