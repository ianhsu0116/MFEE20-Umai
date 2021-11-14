const router = require("express").Router();
const connection = require("../utils/database");
const bcrypt = require("bcrypt");
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;

router.use((req, res, next) => {
  console.log("有一請求進入authRoute");
  next();
});

router.get("/testAPI", async (req, res) => {
  // 測試一下連不連得上
  let testConnect = await connection.queryAsync("SELECT * FROM member");
  return res.send(testConnect);

  const msgObj = {
    message: "Test API is working",
  };
  return res.json(msgObj);
});

// 登入路由
router.post("/login", (req, res) => {
  // 先判斷有無格式錯誤
  let { error } = loginValidation(req.body);
  if (error) return res.status(403).json({ success: false, code: "A001" });

  // 確認是否已被註冊

  // 確認資料是否正確

  req.session.member = req.body;
  res.json({ success: true, member: req.body });
});

// 註冊路由
router.post("/registration", (req, res) => {
  // 先判斷有無格式錯誤
  let { error } = registerValidation(req.body);
  if (error) return res.status(403).json({ success: false, code: "B001" });

  // 確認是否已被註冊

  // 將資料新增至資料庫

  res.json({ success: true });
});

// 拿到使用者資料
router.get("/info", (req, res) => {
  res.json({ success: true, member: req.session.member });
});

// 登出路由
router.get("/logout", (req, res) => {
  req.session.member = null;
  res.status(200).json({ success: true, message: "登出成功" });
});

module.exports = router;
