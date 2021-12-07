const router = require("express").Router();
const connection = require("../utils/database");
const bcrypt = require("bcrypt");
const momnet = require("moment");
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const { registerValidation, loginValidation } = require("../validation");

router.use((req, res, next) => {
  console.log("有一請求進入authRoute");
  next();
});

router.get("/testAPI", async (req, res) => {
  const msgObj = {
    message: "Test API is working",
  };
  return res.json(msgObj);
});

// 本地登入路由
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

    // 帳號未註冊，直接回覆錯誤
    if (member.length === 0)
      return res.status(401).json({ success: false, code: "A002" });

    // 判斷是否為第三方註冊
    if (member[0].googleId) {
      return res.status(401).json({ success: false, code: "A006" });
    } else if (member[0].facebookId) {
      return res.status(401).json({ success: false, code: "A007" });
    }

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
      nick_name: member.nick_name,
      birthday: member.birthday,
      telephone: member.telephone,
      avatar: member.avatar,
      credit_card_number: member.credit_card_number,
      credit_card_name: member.credit_card_name,
      chef_introduction: member.chef_introduction,
      member_category: member.member_category,
    };
    req.session.member = returnMember;

    res.status(200).json({ success: true, member: returnMember });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "A999", message: error });
  }
});

// 本地註冊路由
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

  console.log(req.body);
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

    // 取出新的id
    let { insertId } = result;
    // 優惠券期限
    let nowPlus30 = new Date(Date.now() + 2592000000);
    // 送新用戶一張優惠券
    let couponsResult = await connection.queryAsync(
      "INSERT INTO member_coupons (member_id, coupons_id, expire_date, status, valid) VALUES (?)",
      [[insertId, 5, nowPlus30, 1, 1]]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "B999", message: error });
  }
});

// google登入 註冊
router.post(
  "/google",
  passport.authenticate("google-token"),
  function (req, res) {
    // 登入成功 存入session
    if (req.user.success) {
      req.session.member = req.user.member;
      res.status(200).json(req.user);
    }
    // 登入失敗
    else {
      res.status(401).json({ success: false, code: "B005" });
    }
  }
);

// Facebook登入 註冊
router.post(
  "/facebook",
  passport.authenticate("facebook-token"),
  function (req, res) {
    // 登入成功 存入session
    if (req.user.success) {
      req.session.member = req.user.member;
      res.status(200).json(req.user);
    }
    // 登入失敗
    else {
      res.status(401).json({ success: false, code: "B005" });
    }
  }
);

// 拿到使用者資料
router.get("/memberInfo/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let member = await connection.queryAsync(
      "SELECT * FROM member WHERE id = ? AND valid = ?",
      [id, 1]
    );

    // 取出member資料
    member = member[0];

    let returnMember = {
      id: member.id,
      email: member.email,
      googleId: member.googleId,
      facebookId: member.facebookId,
      first_name: member.first_name,
      last_name: member.last_name,
      nick_name: member.nick_name,
      birthday: member.birthday,
      telephone: member.telephone,
      avatar: member.avatar,
      credit_card_number: member.credit_card_number,
      credit_card_name: member.credit_card_name,
      chef_introduction: member.chef_introduction,
      member_category: member.member_category,
    };

    res.status(200).json({ success: true, member: returnMember });
  } catch (error) {
    res.status(500).json({ success: false, code: "A999", message: error });
  }
});

// 登出路由
router.get("/logout", (req, res) => {
  req.session.member = null;
  res.status(200).json({ success: true, message: "登出成功" });
});

// mailgun 找回密碼功能
var API_KEY = process.env.MAILGUN_API_KEY;
var DOMAIN = process.env.MAILGUN_DOMAIN;
var mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });
// mailgun 找回密碼功能
router.post("/findPassword", async (req, res) => {
  let { email } = req.body;

  // 因為免費的只能測試用，只能寄信給固定的email帳號，故在忘記密碼demo時一定要使用 ianhsu0116@gmail.com, or ianian880116@gmail.com
  //let email = "ianhsu0116@gmail.com";

  try {
    // 先尋找有無此email
    let foundMember = await connection.queryAsync(
      "SELECT * FROM member WHERE email = ? AND valid = ?",
      [email, 1]
    );

    // 若是沒註冊過
    if (foundMember.length === 0)
      return res.status(401).json({ success: false, code: "A002" });

    // 判斷是否為第三方註冊
    if (foundMember[0].googleId) {
      return res.status(401).json({ success: false, code: "A006" });
    } else if (foundMember[0].facebookId) {
      return res.status(401).json({ success: false, code: "A007" });
    }

    // 修改使用者密碼
    let newPassword = uuidv4();
    newPassword = newPassword.substr(0, 12);
    let hashedPassword = await bcrypt.hash(newPassword, 10);

    // 將新密碼裝好並寄出email
    const data = {
      from: "IanHsu <ianhsu0116@gmail.com>",
      to: email,
      subject: "「 Umai 米其林廚藝課程學習平台 」忘記密碼，協助尋回密碼信件。",
      text: `親愛的Umai使用者您好\n這是您的臨時密碼[ ${newPassword} ]， 請於24小時內登入並修改密碼，避免有安全上的疑慮，謝謝！`,
    };
    mailgun.messages().send(data, async (error, body) => {
      if (error) {
        res.status(500).json({ success: false, code: "A008", message: error });
      } else {
        //console.log(body);

        // 將新密碼存入DB
        let result = await connection.queryAsync(
          "UPDATE member SET password = ? WHERE email = ? AND valid = ?",
          [hashedPassword, email, 1]
        );

        res.status(200).json({ success: true });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, code: "A999", message: error });
  }
});
module.exports = router;
