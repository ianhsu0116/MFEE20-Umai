const router = require("express").Router();
const connection = require("../utils/database");
const bcrypt = require("bcrypt");
const momnet = require("moment");
const passport = require("passport");
//require("../config/passport")(passport);
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;

router.use((req, res, next) => {
  console.log("有一請求進入authRoute");
  next();
});

router.get("/testAPI", async (req, res) => {
  // 測試一下連不連得上
  // let testConnect = await connection.queryAsync("SELECT * FROM member");
  // return res.send(testConnect);

  const msgObj = {
    message: "Test API is working",
  };
  return res.json(msgObj);
});

// 登入路由
router.post("/login", async (req, res) => {
  // 先判斷有無格式錯誤
  let { error } = loginValidation(req.body);
  if (error) {
    if (error.details[0].context.key === "email") {
      return res.status(401).json({ success: false, code: "A003" });
    } else if (error.details[0].context.key === "password") {
      return res.status(401).json({ success: false, code: "A004" });
    }
  }

  //取出資料
  let { email, password } = req.body;
  // 紀錄當前時間
  let now = momnet().format("YYYY-MM-DDTHH:mm:ss");

  // 確認是否已被註冊
  try {
    let member = await connection.queryAsync(
      "SELECT * FROM member WHERE email = ?",
      email
    );

    // 已還未註冊，直接回覆錯誤
    if (member.length === 0)
      return res.status(401).json({ success: false, code: "A002" });

    // 取出member資料
    member = member[0];

    // 確認密碼是否正確
    let result = await bcrypt.compare(password, member.password);

    // 密碼不正確，直接回覆錯誤
    if (!result) return res.status(401).json({ success: false, code: "A001" });

    // 比對資料成功，寫入 session
    let returnMember = {
      id: member.id,
      email: member.email,
      googleId: member.googleId,
      facebookId: member.facebookId,
      first_name: member.first_name,
      last_name: member.last_name,
      birthday: member.birthday,
      telephone: member.telephone,
      avatar_image: member.avatar_image,
      credit_card_number: member.credit_card_number,
      chef_introduction: member.chef_introduction,
      member_category: member.member_category,
    };
    req.session.member = returnMember;

    res.status(200).json({ success: true, member: returnMember });
  } catch (error) {
    res.status(500).json({ success: false, code: "A999", message: error });
  }
});

// 註冊路由
router.post("/registration", async (req, res) => {
  // 先判斷有無格式錯誤
  let { error } = registerValidation(req.body);
  if (error) {
    if (error.details[0].context.key === "email") {
      return res.status(401).json({ success: false, code: "B001" });
    } else if (error.details[0].context.key === "password") {
      return res.status(401).json({ success: false, code: "B002" });
    }
  }

  //取出資料
  let { email, password } = req.body;
  // 紀錄當前時間
  let now = momnet().format("YYYY-MM-DDTHH:mm:ss");

  // 確認是否已被註冊
  try {
    let member = await connection.queryAsync(
      "SELECT * FROM member WHERE email = ?",
      email
    );

    // 已被註冊，直接回覆錯誤
    if (member.length !== 0)
      return res.status(401).json({ success: false, code: "B003" });

    // 將密碼加密
    let hashPassword = await bcrypt.hash(password, 10);

    // 新會員存入資料庫
    let result = await connection.queryAsync(
      "INSERT INTO member (email, password, created_time) VALUES (?)",
      [[email, hashPassword, now]]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, code: "B999", message: error });
  }
});

// google登入 註冊
router.post(
  "/google",
  passport.authenticate("google-token"),
  function (req, res) {
    //console.log(req.user);

    // 登入成功 存入session
    req.session.member = req.user;
    res.status(200).json(req.user);
  }
);

// Facebook登入 註冊
router.post(
  "/facebook",
  passport.authenticate("facebook-token"),
  function (req, res) {
    //console.log(req.user);

    // 登入成功 存入session
    req.session.member = req.user;
    res.status(200).json(req.user);
  }
);

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
