require("dotenv").config();
const bodyParser = require("body-parser");
const connection = require("../utils/database");
const express = require("express");
const router = express.Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// multer 處理上傳檔案
const multer = require("multer");
// const { resourceUsage } = require("process");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "upload-images"));
  },
  filename: function (req, file, cb) {
    //console.log("filename", file);
    // 取出副檔名
    const ext = file.originalname.split(".").pop();
    cb(null, `forum-${uuidv4()}.${ext}`);
  },
});

// 上傳檔案的檔案限制
const uploader = multer({
  storage: storage,
  // 可以用來過濾檔案
  fileFilter: function (req, file, cb) {
    console.log(file);
    if (
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/png"
    ) {
      cb(new Error("不允許的檔案類型 "), false);
    }
    cb(null, true);
  },
  // 限定檔案大小 4M
  limits: {
    fileSize: 1024 * 1024 * 4,
  },
});

router.use((req, res, next) => {
  console.log("有一請求進入forumRoute");
  next();
});

// 讀取所有的留言
router.get("/comment/:id", async (req, res) => {
  // let {}
  let comment = await connection.queryAsync(
    "SELECT forum_comment.*,member.avatar,member.first_name,member.last_name FROM forum_comment,member WHERE member.id=forum_comment.member_id AND article_id=? AND forum_comment.valid=1",
    [req.params.id]
  );
  // "SELECT forum_comment.* ,member.first_name,member.last_name , member.avatar FROM forum_comment , member WHERE forum_comment.article_id = 28 AND forum_comment.valid = 1;",
  //   [req.params.id];

  res.json({ comment: comment });
});
//  WHERE article_id=?
// 拿到所有文章
router.get("/", async (req, res) => {
  try {
    // 拿到每篇文的資料 + 愛心數量 + 留言數量
    let articles = await connection.queryAsync(
      "SELECT forum_article.*, member.first_name, member.last_name, member.email, member.avatar, COUNT(article_like.member_id) AS like_count, COUNT(forum_comment.member_id) AS comment_count FROM forum_article LEFT JOIN article_like ON forum_article.id = article_like.article_id LEFT JOIN forum_comment ON forum_article.id = forum_comment.article_id LEFT JOIN member ON forum_article.member_id = member.id WHERE forum_article.valid = ? GROUP BY forum_article.id ORDER BY forum_article.id DESC ",
      [1]
    );

    // 將拿到的所有文章資料的id取出
    let articleIds = articles.map((item) => item.id);

    // 依序拿到每篇文章按讚的所有會員的member_id==========================================================
    let likes = await connection.queryAsync(
      "SELECT * FROM article_like WHERE article_id IN (?)",
      [articleIds]
    );

    // 將按讚的人依照文章id分組
    let sortedLikes = {};
    // 將裝個別文章按愛心 id array的容器準備好
    articleIds.forEach((id) => (sortedLikes[id] = []));

    // 依序將id裝入對應的key內
    likes.forEach((item) => {
      sortedLikes[item.article_id].push(item.member_id);
    });

    // 依序拿到每篇文章按讚的所有會員的member_id==========================================================

    let collections = await connection.queryAsync(
      "SELECT * FROM article_collection WHERE article_id IN (?)",
      [articleIds]
    );

    // 將收藏此文章的人依照文章id分組
    let sortedCollect = {};
    // 將裝個別文章收藏id array的容器準備好
    articleIds.forEach((id) => (sortedCollect[id] = []));

    // 依序將id裝入對應的key內
    collections.forEach((item) => {
      sortedCollect[item.article_id].push(item.member_id);
    });

    // ==========================================================

    // 將id_Array (likes, collections) 分別裝入對應的articleDetail中
    articles.forEach((item) => {
      // likes的id
      item["whoLike"] = sortedLikes[item.id];

      // collections的id
      item["whoCollection"] = sortedCollect[item.id];
    });

    //console.log(forumdata);
    res.json({ forumdata: articles });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

// 收藏文章
router.get("/", async (req, res) => {
  console.log("body", req.body);
  console.log("req.file", req.file);
  //req.body.image_name = req.file.originalname;
  // console.log(req.body.image_name);
  // res.json({ result: "okok" });
  let now = new Date();
  try {
    let forumdatadetail = await connection.queryAsync(
      "INSERT INTO article_collection (article_id,memeber_id) VALUES (?)",
      [[req.body.article_id, req.body.member_id]]
    );
    //console.log("forumdatadetail", forumdatadetail);
    res.json({ forumdatadetail: forumdatadetail });
    //console.log("articel_link", forumdatadetail.article_link);
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

// 依據forumId拿到文章詳細內容
router.get("/:forumId", async (req, res) => {
  try {
    let forumdatadetail = await connection.queryAsync(
      "SELECT forum_article.*, member.first_name, member.last_name, member.email, member.avatar, COUNT(article_like.member_id) AS like_count, COUNT(forum_comment.member_id) AS comment_count FROM forum_article LEFT JOIN article_like ON forum_article.id = article_like.article_id LEFT JOIN forum_comment ON forum_article.id = forum_comment.article_id LEFT JOIN member ON forum_article.member_id = member.id WHERE forum_article.id = ? AND forum_article.valid = ? GROUP BY forum_article.id",
      [req.params.forumId, 1]
    );
    console.log(forumdatadetail);
    res.json({ forumdatadetail: forumdatadetail[0] });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

// 新增文章
router.post("/insertArticle", uploader.single("image"), async (req, res) => {
  console.log("body", req.body);
  console.log("req.file", req.file);
  //req.body.image_name = req.file.originalname;
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
    //console.log("forumdatadetail", forumdatadetail);
    res.json({ forumdatadetail: forumdatadetail });
    //console.log("articel_link", forumdatadetail.article_link);
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

// 新增留言
router.post("/insertMessage", uploader.single("image"), async (req, res) => {
  console.log("body", req.body);
  // console.log("req.file insertmessage", req.file);
  // req.body.image_name = req.file.originalname;
  // console.log(req.file.filename);
  // res.json({ result: "okok" });
  let now = new Date();
  try {
    let messagedetail = await connection.queryAsync(
      "INSERT INTO forum_comment (member_id,article_id,comment_text,image_name,created_time,valid) VALUES (?,?,?,?,?,?)",
      [
        req.body.member_id,
        req.body.article_id,
        req.body.message_text,
        req.file.filename,
        now,
        1,
      ]
    );
    //console.log("forumdatadetail", forumdatadetail);
    // res.json({ messagedetail: messagedetail });
    res.json({ message: "成功了讚讚" });
    //console.log("articel_link", forumdatadetail.article_link);
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

// router.get("/comment/:id", async (req, res) => {
//   try {
//     let comment = await connection.queryAsync(
//       "SELECT * FROM forum_comment WHERE id=?",
//       [req.params.id]
//     );
//     res.json({ comment: comment });
//   } catch (e) {
//     console.log(e);
//   }
// });

// 更新文章
router.post("/updateArticle", uploader.single("image"), async (req, res) => {
  // console.log("body", req.body);
  // console.log("req.file", req.file);
  req.body.image_name = req.file.filename;
  // console.log(req.body.image_name);
  // res.json({ result: "okok" });
  let now = new Date();
  try {
    // console.log(req.body.id);
    let forumdatadetail = await connection.queryAsync(
      "UPDATE forum_article SET image_name=?,category_id=?,course_id=?,article_title=? ,article_link=?,article_text=?,created_time=?,valid=? WHERE id=?",
      [
        req.file.filename,
        req.body.category_id,
        req.body.course_id,
        req.body.article_title,
        req.body.article_link,
        req.body.article_text,
        now,
        1,
        req.body.id,
      ]
    );
    console.log(forumdatadetail);
    res.json({ forumdatadetail: forumdatadetail });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

router.post("/deleteArticle", async (req, res) => {
  let id = req.body.id;
  let result = await connection.queryAsync(
    "UPDATE forum_article SET valid=? WHERE id=?",
    [0, id]
  );
  res.send(result);
});

router.post("/deleteMessage", async (req, res) => {
  let id = req.body.id;
  let result = await connection.queryAsync(
    "UPDATE forum_comment SET valid=? WHERE id=?",
    [0, id]
  );
  console.log(id);
  res.send(result);
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

    // 依序拿到每篇文章按讚的所有會員的member_id==========================================================

    let likes = await connection.queryAsync(
      "SELECT * FROM article_like WHERE article_id IN (?)",
      [articleIds]
    );

    // 將按讚的人依照文章id分組
    let sortedLikes = {};
    // 將裝個別文章按愛心 id array的容器準備好
    articleIds.forEach((id) => (sortedLikes[id] = []));

    // 依序將id裝入對應的key內
    likes.forEach((item) => {
      sortedLikes[item.article_id].push(item.member_id);
    });

    // 依序拿到每篇文章按讚的所有會員的member_id==========================================================

    let collections = await connection.queryAsync(
      "SELECT * FROM article_collection WHERE article_id IN (?)",
      [articleIds]
    );

    // 將收藏此文章的人依照文章id分組
    let sortedCollect = {};
    // 將裝個別文章收藏id array的容器準備好
    articleIds.forEach((id) => (sortedCollect[id] = []));

    // 依序將id裝入對應的key內
    collections.forEach((item) => {
      sortedCollect[item.article_id].push(item.member_id);
    });

    // ==========================================================

    // 將id_Array (likes, collections) 分別裝入對應的articleDetail中
    sortedArticles.forEach((item) => {
      // likes的id
      item["whoLike"] = sortedLikes[item.id];

      // collections的id
      item["whoCollection"] = sortedCollect[item.id];
    });

    res.json({ success: true, article: sortedArticles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "C999", message: error });
  }
});

// 取消或新增收藏
router.post("/collection/:member_id", async (req, res) => {
  let { member_id } = req.params;
  let { article_id } = req.body;

  try {
    // 確認使否已存在收藏列表
    let isInCollect = await connection.queryAsync(
      "SELECT * FROM article_collection WHERE member_id = ? AND article_id = ?",
      [member_id, article_id]
    );

    // 已經存在，就刪除
    if (isInCollect.length !== 0) {
      let { id } = isInCollect[0];
      let result = await connection.queryAsync(
        "DELETE FROM article_collection WHERE id = ?",
        [id]
      );

      // 刪除成功
      res.status(200).json({ success: true, mode: "delete" });
      return;
    }

    // 原本不存在收藏，就新增
    let result = await connection.queryAsync(
      "INSERT INTO article_collection(member_id, article_id) VALUES(?)",
      [[member_id, article_id]]
    );

    res.status(200).json({ success: true, mode: "insert" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "C999", message: error });
  }
});

// 按讚或 / 取消按讚
router.post("/like/:member_id", async (req, res) => {
  let { member_id } = req.params;
  let { article_id } = req.body;

  try {
    // 確認使否已存在收藏列表
    let isInLikes = await connection.queryAsync(
      "SELECT * FROM article_like WHERE member_id = ? AND article_id = ?",
      [member_id, article_id]
    );

    // 已經存在，就刪除
    if (isInLikes.length !== 0) {
      let result = await connection.queryAsync(
        "DELETE FROM article_like WHERE member_id = ? AND article_id = ?",
        [member_id, article_id]
      );

      // 刪除成功
      res.status(200).json({ success: true, mode: "delete" });
      return;
    }

    // 原本不存在收藏，就新增
    let result = await connection.queryAsync(
      "INSERT INTO article_like(member_id, article_id) VALUES(?)",
      [[member_id, article_id]]
    );

    res.status(200).json({ success: true, mode: "insert" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "C999", message: error });
  }
});

// eddie
router.post("/likeHeart", async (req, res) => {
  if (req.body.action === "add") {
    let add = await connection.queryAsync(
      "INSERT INTO article_like (member_id,article_id) VALUES(?)",
      [[req.session.member.id, req.body.article_id]]
    );
    res.json({ code: "0", message: "按了讚" });
  } else {
    let minus = await connection.queryAsync(
      "DELETE FROM article_like WHERE member_id = ? AND article_id = ?",
      [req.session.member.id, req.body.article_id]
    );
    res.json({ code: "0", message: "收了讚" });
  }
});

module.exports = router;
