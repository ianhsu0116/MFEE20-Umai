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

    // 拿到每篇文的資料 + 愛心數量 + 留言數量
    let articles = await connection.queryAsync(
      "SELECT forum_article.*, COUNT(article_like.member_id) AS like_count, COUNT(forum_comment.member_id) AS comment_count FROM forum_article LEFT JOIN article_like ON forum_article.id = article_like.article_id LEFT JOIN forum_comment ON forum_article.id = forum_comment.article_id WHERE forum_article.id IN (?) AND forum_article.valid = ? GROUP BY forum_article.id ",
      [articleIds, 1]
    );

    // 將article按照articleIds的順序排好
    let sortedArticles = [];
    articleIds.forEach((item) => {
      for (let i = 0; i < articles.length; i++) {
        if (articles[i].id === item) {
          sortedArticles.push(articles[i]);
          break;
        }
      }
    });

    // 依序拿到每篇文章按讚的所有會員的member_id
    let likes = await connection.queryAsync(
      "SELECT * FROM article_like WHERE article_id IN (?)",
      [articleIds]
    );

    // 將按讚的人依照文章id分組
    let sortedLikes = {};
    // 將裝分組likes的容器準備好
    articleIds.forEach((id) => (sortedLikes[id] = []));

    // 依序將id裝入對應的key內
    likes.forEach((item) => {
      sortedLikes[item.article_id].push(item.member_id);
    });

    // 將id_Array分別裝入對應的articleDetail中
    sortedArticles.forEach((item) => {
      item["whoLikes"] = sortedLikes[item.id];
    });

    res.json({ success: true, article: sortedArticles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "C999", message: error });
  }
});

module.exports = router;
