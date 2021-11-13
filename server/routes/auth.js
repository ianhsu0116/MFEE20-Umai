const router = require("express").Router();
const bcrypt = require("bcrypt");
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;

router.use((req, res, next) => {
  console.log("有一請求進入authRoute");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is working",
  };
  return res.json(msgObj);
});

// 登入路由
router.post("/login", (req, res) => {
  // 先判斷有無格式錯誤
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認是否已被註冊

  // 確認資料是否正確

  req.session.member = req.body;
  res.send(req.body);
});

// 註冊路由
router.post("/registration", (req, res) => {
  // 先判斷有無格式錯誤
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認是否已被註冊

  // 將資料新增至資料庫

  req.session.member = req.body;
  res.send(req.body);
});

// 拿到使用者資料
router.get("/info", (req, res) => {
  res.json(req.session.member);
});

// 登出路由
router.get("/logout", (req, res) => {
  req.session.member = null;
  res.status(200).json({ code: 200, message: "登出成功" });
});

module.exports = router;
