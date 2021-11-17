const router = require("express").Router();
const authCheck = require("./middleware");
const path = require("path");
const connection = require("../utils/database");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const momnet = require("moment");
const { studentValidation } = require("../validation");

// ================routes=====================

router.use((req, res, next) => {
  console.log("有一請求進入courseRoute");
  next();
});

// 阻擋未登入的請求
router.use(authCheck);

// multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "upload-images"));
  },
  filename: function (req, file, cb) {
    //console.log("filename", file);

    //   //取出副檔名;
    const ext = file.originalname.split(".").pop();
    cb(null, `course-${uuidv4()}.${ext}`);
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

// 新增課程
router.post("/course", uploader.array("images"), async (req, res) => {
  // 先判斷格式是否正確
  // let { error } = studentValidation(req.body);
  // if (error) {
  //   return res.status(403).json({ success: false, code });
  // }
  let { id } = req.session.member;
  let now = momnet().format("YYYY-MM-DDTHH:mm:ss");
  console.log(req.body);
  req.files.forEach((file) => {
    console.log(file.filename);
  });

  // try {
  //   let result = await connection.queryAsync(
  //     "INSERT INTO student (member_id, first_name, last_name, birthday, email, telephone, created_time, valid) VALUES (?)",
  //     [[id, first_name, last_name, birthday, email, telephone, now, 1]]
  //   );
  //   res.status(200).json({ success: true });
  // } catch (error) {
  //   //console.log(error);
  //   res.status(500).json({ success: false, code: "G999", message: error });
  // }
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

module.exports = router;
