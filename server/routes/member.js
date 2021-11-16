const router = require("express").Router();
const connection = require("../utils/database");
const bcrypt = require("bcrypt");
const momnet = require("moment");
const userInfoValidation = require("../validation").userInfoValidation;

router.use((req, res, next) => {
  console.log("有一請求進入memberRoute");
  next();
});

// 確認當前是否為登入狀態
router.use((req, res, next) => {
  if (!req.session.member) {
    return res.status(403).send({ success: false, code: "A005" });
  }
  next();
});

// 測試路由
router.get("/testAPI", async (req, res) => {
  const msgObj = {
    message: "Test API is working",
  };
  return res.json(msgObj);
});

// 修改使用者基本資料
router.post("/info", async (req, res) => {
  // 目前少一步揍 => validation check
  let { error } = userInfoValidation(req.body);
  if (error) {
    let { key } = error.details[0].context;
    let code;
    switch (key) {
      case "first_name":
        code = "G001";
        break;
      case "last_name":
        code = "G002";
        break;
      case "telephone":
        code = "G003";
        break;
      case "birthday":
        code = "G004";
        break;
      default:
        code = "G999";
        break;
    }

    return res.status(403).json({ success: false, code });
  }

  let { id } = req.session.member;
  let { first_name, last_name, telephone, birthday } = req.body;

  try {
    let result = await connection.queryAsync(
      "UPDATE member SET first_name = ?, last_name = ?, telephone = ?, birthday = ? WHERE id = ?",
      [first_name, last_name, telephone, birthday, id]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});

module.exports = router;
