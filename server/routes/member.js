const router = require("express").Router();
const authCheck = require("./middleware");
const path = require("path");
const connection = require("../utils/database");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const momnet = require("moment");
const {
  userInfoValidation,
  passwordValidation,
  creditCardValidation,
  studentValidation,
} = require("../validation");

// ================routes=====================

router.use((req, res, next) => {
  console.log("有一請求進入memberRoute");
  next();
});

// 阻擋未登入的請求
//router.use(authCheck);

// multer
const multer = require("multer");
const { resourceUsage } = require("process");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "upload-images"));
  },
  filename: function (req, file, cb) {
    //console.log("filename", file);
    // 取出副檔名
    const ext = file.originalname.split(".").pop();
    cb(null, `avatar-${uuidv4()}.${ext}`);
  },
});
const uploader = multer({
  storage: storage,
  // 可以用來過濾檔案
  fileFilter: function (req, file, cb) {
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

// 測試路由
router.get("/testAPI", async (req, res) => {
  const msgObj = {
    message: "Test API is working",
  };
  return res.json(msgObj);
});

// 修改使用者基本資料
router.put("/info", async (req, res) => {
  // 先判斷格式是否正確
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
    //console.log(error);
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});

// 修改使用者密碼
router.put("/password", async (req, res) => {
  let { id } = req.session.member;
  let { newPassword, passwordConfirm } = req.body;

  // 判斷新密碼格式是否正確
  let { error } = passwordValidation({ newPassword });
  if (error) return res.status(403).json({ success: false, code: "G006" });

  try {
    // 找到當前使用者資料
    let oldPassword = await connection.queryAsync(
      "SELECT password FROM member WHERE id = ?",
      id
    );
    oldPassword = oldPassword[0].password;

    // 比對密碼確認
    let isCompare = await bcrypt.compare(passwordConfirm, oldPassword);

    // 密碼確認不符合
    if (!isCompare)
      return res.status(401).json({ success: false, code: "G005" });

    // 比對新設定的密碼是否跟舊的一樣(一樣就等於沒改)
    if (passwordConfirm === newPassword)
      return res.status(401).json({ success: false, code: "G008" });

    // 將新密碼加密
    let hashedPassword = await bcrypt.hash(newPassword, 10);

    // 更新資料
    let result = await connection.queryAsync(
      "UPDATE member SET password = ? WHERE id = ?",
      [hashedPassword, id]
    );

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});

// 修改使用者頭像
router.put("/avatar", uploader.single("avatar"), async (req, res) => {
  let { id } = req.session.member;
  let { filename } = req.file;
  // console.log(filename);

  try {
    let result = await connection.queryAsync(
      "UPDATE member SET avatar = ? WHERE id = ?",
      [filename, id]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});

// 修改信用卡資訊
router.put("/creditCard", async (req, res) => {
  let { id } = req.session.member;
  let { number, name } = req.body;

  // 判斷新格式是否正確
  let { error } = creditCardValidation({ number, name });
  if (error) {
    if (error.details[0].context.key === "number") {
      return res.status(403).json({ success: false, code: "F001" });
    } else if (error.details[0].context.key === "name") {
      return res.status(403).json({ success: false, code: "F002" });
    }
  }

  try {
    let result = await connection.queryAsync(
      "UPDATE member SET credit_card_number = ?, credit_card_name = ? WHERE id = ?",
      [number, name, id]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});

// 新增預設學員資料
router.post("/student", async (req, res) => {
  // 先判斷格式是否正確
  let { error } = studentValidation(req.body);
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
      case "email":
        code = "G007";
        break;
      default:
        code = "G999";
        break;
    }

    return res.status(403).json({ success: false, code });
  }

  let { id } = req.session.member;
  let now = momnet().format("YYYY-MM-DDTHH:mm:ss");
  let { first_name, last_name, birthday, email, telephone } = req.body;

  try {
    let result = await connection.queryAsync(
      "INSERT INTO student (member_id, first_name, last_name, birthday, email, telephone, created_time, valid) VALUES (?)",
      [[id, first_name, last_name, birthday, email, telephone, now, 1]]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});

// 拿取所有學員資料
router.get("/student", async (req, res) => {
  let { id } = req.session.member;

  try {
    let result = await connection.queryAsync(
      "SELECT * FROM student WHERE member_id = ? AND valid = ?",
      [id, 1]
    );
    res.status(200).json({ success: true, students: result });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});

// 編輯預設學員資料
router.put("/student", async (req, res) => {
  // 先判斷格式是否正確
  let { error } = studentValidation(req.body);
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
      case "email":
        code = "G007";
        break;
      default:
        code = "G999";
        break;
    }

    return res.status(403).json({ success: false, code });
  }

  //let now = momnet().format("YYYY-MM-DDTHH:mm:ss");
  let { id, first_name, last_name, birthday, email, telephone } = req.body;

  try {
    let result = await connection.queryAsync(
      "UPDATE student SET first_name = ?, last_name = ?, birthday = ?, email = ?, telephone = ? WHERE id = ?",
      [first_name, last_name, birthday, email, telephone, id]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});

// 刪除預設學員資料
router.put("/studentDelete", async (req, res) => {
  //let now = momnet().format("YYYY-MM-DDTHH:mm:ss");
  let { id } = req.body;
  try {
    let result = await connection.queryAsync(
      "UPDATE student SET valid = ? WHERE id = ?",
      [0, id]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});

// 依照member_id拿取優惠券
router.get("/coupons/:member_id", async (req, res) => {
  let { member_id } = req.params;
  let { type } = req.query;

  // 現在時間
  let now = new Date();
  let sqlCode;
  switch (type) {
    // 未使用(且未過期)
    case "1":
      sqlCode =
        "SELECT member_coupons.*, coupons.title, coupons.discount_percent FROM member_coupons JOIN coupons ON member_coupons.coupons_id = coupons.id WHERE member_coupons.member_id = ? AND member_coupons.expire_date > ? AND member_coupons.status = 1 AND member_coupons.valid = 1";
      break;
    // 已使用(不管有無過期 status=2的就會在此分類)
    case "2":
      sqlCode =
        "SELECT member_coupons.*, coupons.title, coupons.discount_percent FROM member_coupons JOIN coupons ON member_coupons.coupons_id = coupons.id WHERE member_coupons.member_id = ? AND member_coupons.status = 2 AND member_coupons.valid = 1";
      break;
    // 已過期(未曾使用且過期)
    case "3":
      sqlCode =
        "SELECT member_coupons.*, coupons.title, coupons.discount_percent FROM member_coupons JOIN coupons ON member_coupons.coupons_id = coupons.id WHERE member_coupons.member_id = ? AND member_coupons.expire_date < ? AND member_coupons.status = 1 AND member_coupons.valid = 1";
      break;
    default:
      return res.status(404).json({ success: false, code: "G999" });
  }

  try {
    let result = await connection.queryAsync(sqlCode, [member_id, now]);
    res.status(200).json({ success: true, coupons: result });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});

// 編輯主廚卡片資料
router.post("/chefIntro/:member_id", async (req, res) => {
  let { member_id } = req.params;
  let { info_text } = req.body;

  try {
    let result = await connection.queryAsync(
      "UPDATE member SET chef_introduction = ? WHERE id =? AND member_category= ?",
      [info_text, member_id, 2]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});
// 抓member_category = 2(主廚)資料
router.get("/member/chefName", async (req, res) => {
  let { id } = req.session.member;

  try {
    let result = await connection.queryAsync(
      "SELECT member.id , member.first_name , last_name , member.chef_introduction , member.member_category  FROM member WHERE member_category = 2 AND valid = ?",
      [id, 1]
    );

    res.status(200).json({ success: true, chefs: result });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});

module.exports = router;