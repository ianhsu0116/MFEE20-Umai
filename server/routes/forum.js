require("dotenv").config();
const mysql = require("mysql");
const Promise = require("bluebird");
const bodyParser = require("body-parser");
const connection = require("../utils/database");
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { now } = require("moment");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // do something
    cb(null, path.join(__dirname, "..", "public", "upload-images"));
  },
  filename: function (req, file, cb) {
    // 為什麼改圖檔名稱？
    // 好管理、檔名不會重複、有規則、...
    // TODO: 改黨名
    console.log("filename", file);
    // {
    //   fieldname: 'photo',
    //   originalname: 'mustread2.jpg', jpeg
    //   encoding: '7bit',
    //   mimetype: 'image/jpeg'
    // }
    // must.read2.jpg ==> ["must", "read2", "jpg"]
    // pop 從陣列後面拿出資料
    const ext = file.originalname.split(".").pop();
    cb(null, `forum-${Date.now()}.${ext}`);
  },
});
const uploader = multer({
  storage: storage,
  // 可以用來過濾檔案
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg"
    ) {
      cb(new Error("不符合允許的檔案類型 "), false);
    }
    cb(null, true);
  },
  // 限定檔案大小 2M, 10M, ... => 硬碟再便宜也是要錢、避免惡意程式
});
router.get("/", async (req, res) => {
  try {
    let forumdata = await connection.queryAsync(
      "SELECT * FROM forum_article WHERE valid=1  "
    );
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

router.post("/insertArticle", uploader.single("image"), async (req, res) => {
  // console.log("body", req.body);
  console.log("req.file", req.file);
  req.body.image_name = req.file.originalname;
  // console.log(req.body.image_name);
  // res.json({ result: "okok" });
  let now = new Date();
  try {
    let forumdatadetail = await connection.queryAsync(
      "INSERT INTO forum_article (member_id,image_name,category_id,course_id,article_title,article_link,article_text,created_time,valid) VALUES (?)",
      [
        [
          1,
          req.file.filename,
          req.body.category_id,
          req.body.course_id,
          req.body.article_title,
          req.body.article_link,
          req.body.article_text,
          now,
          1,
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

router.post("/updateArticle", uploader.single("image"), async (req, res) => {
  // console.log("body", req.body);
  console.log("req.file", req.file);
  req.body.image_name = req.file.originalname;
  // console.log(req.body.image_name);
  // res.json({ result: "okok" });
  let now = new Date();
  try {
    let forumdatadetail = await connection.queryAsync(
      "Update forum_article SET (member_id,image_name,category_id,course_id,article_title,article_link,article_text,created_time,valid) VALUES (?)",
      [
        [
          1,
          req.file.filename,
          req.body.category_id,
          req.body.course_id,
          req.body.article_title,
          req.body.article_link,
          req.body.article_text,
          now,
          1,
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
