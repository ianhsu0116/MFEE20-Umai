require("dotenv").config();
const bodyParser = require("body-parser");
const connection = require("../utils/database");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

router.use((req, res, next) => {
  console.log("有一請求進入forumRoute");
  next();
});

// 拿到所有文章
router.get("/", async (req, res) => {
  try {
    let forumdata = await connection.queryAsync("SELECT * FROM forum_article ");
    //console.log(forumdata);
    res.json({ forumdata: forumdata });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

// 依據forumId拿到文章詳細內容
router.get("/:forumId", async (req, res) => {
  try {
    let forumdatadetail = await connection.queryAsync(
      "SELECT * FROM forum_article WHERE id=?",
      [req.params.forumId]
    );
    //console.log(forumdatadetail);
    res.json({ forumdatadetail: forumdatadetail[0] });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

// 新增文章
router.post("/insertArticle", upload.array(), async (req, res) => {
  //console.log("body", req.body);
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
    //console.log(forumdatadetail);
    res.json({ forumdatadetail: forumdatadetail });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

// ian 新增
// 根據 member_id 拿到此member收藏的文章
router.get("/collection/:member_id", async (req, res) => {
  let { member_id } = req.params;

  try {
    let result = await connection.queryAsync(
      "SELECT * FROM article_collection WHERE member_id = ? ORDER BY id DESC",
      member_id
    );

    // 如果沒有任何收藏文章
    if (result.length === 0) return res.json({ success: true, article: [] });

    // 將 id 提取出來，變成一個單純的array
    let articleIds = result.map((item) => item.article_id);

    // 拿到所有文章的詳細資料
    let articles = await connection.queryAsync(
      "SELECT * FROM forum_article WHERE id IN (?) AND valid = ?",
      [articleIds, 1]
    );
    // let articles = await connection.queryAsync(
    //   "SELECT forum_article.*, IFNULL(like_count, 0) FROM forum_article WHERE id IN (?) AND valid = ?",
    //   [articleIds, 1]
    // );

    // 依序拿到每篇文有幾個讚
    let likes = await connection.queryAsync(
      "SELECT COUNT(member_id) like_count FROM article_like WHERE article_id IN (?) GROUP BY article_id",
      [articleIds]
    );
    console.log("likes", likes);

    // 依序拿到每篇文有幾則留言
    let comments = await connection.queryAsync(
      "SELECT COUNT(id) comment_count FROM forum_comment WHERE article_id IN (?) GROUP BY article_id",
      [articleIds]
    );
    console.log("comments", comments);

    res.json({ success: true, article: articles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "C999", message: error });
  }
});

module.exports = router;
