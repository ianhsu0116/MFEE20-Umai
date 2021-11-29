const router = require("express").Router();
const authCheck = require("./middleware");
const path = require("path");
const connection = require("../utils/database");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const momnet = require("moment");
const { connect } = require("../utils/database");

// ================routes=====================

router.use((req, res, next) => {
  console.log("有一請求進入orderRoute");
  next();
});

// 阻擋未登入的請求
//router.use(authCheck);

// 測試路由
router.get("/testAPI", async (req, res) => {
  const msgObj = {
    message: "Test API is working",
  };
  return res.json(msgObj);
});

// 根據member_id拿到所有order
router.post("/member/:member_id", async (req, res) => {
  let { member_id } = req.params;
  // type => 1:未完成; 2:已完成; 3:歷史訂單
  let { type } = req.body;

  // 現在時間
  let now = new Date();
  // 現在時間-2天 (判斷是否為歷史訂單)
  let nowMinus2 = new Date(Date.now() - 172800000);

  let sqlCode = "";
  switch (type) {
    // 未完成
    case 1:
      sqlCode =
        "SELECT orders.*, course.course_name, course.course_image, course.member_limit, course_batch.member_count, course_batch.batch_date, course_comment.score, course_comment.comment_text FROM orders JOIN course ON orders.course_id = course.id JOIN course_batch ON orders.batch_id = course_batch.id LEFT JOIN course_comment ON orders.id = course_comment.orders_id WHERE orders.member_id = ? AND course_batch.batch_date > ? ORDER BY orders.created_time DESC";
      break;
    // 已完成
    case 2:
      sqlCode =
        "SELECT orders.*, course.course_name, course.course_image, course.member_limit, course_batch.member_count, course_batch.batch_date, course_comment.score, course_comment.comment_text FROM orders JOIN course ON orders.course_id = course.id JOIN course_batch ON orders.batch_id = course_batch.id LEFT JOIN course_comment ON orders.id = course_comment.orders_id WHERE orders.member_id = ? AND course_batch.batch_date < ? AND course_batch.batch_date > ? ORDER BY orders.created_time DESC";
      break;
    // 歷史訂單(已完成後一天)
    case 3:
      sqlCode =
        "SELECT orders.*, course.course_name, course.course_image, course.member_limit, course_batch.member_count, course_batch.batch_date, course_comment.score, course_comment.comment_text FROM orders JOIN course ON orders.course_id = course.id JOIN course_batch ON orders.batch_id = course_batch.id LEFT JOIN course_comment ON orders.id = course_comment.orders_id WHERE orders.member_id = ? AND course_batch.batch_date < ? AND course_batch.batch_date < ? ORDER BY orders.created_time DESC";
      break;
    default:
      return res.status(404).json({ success: false, code: "G101" });
  }

  try {
    // 訂單資訊
    let result = await connection.queryAsync(sqlCode, [
      member_id,
      now,
      nowMinus2,
    ]);

    // 如果沒找到任何訂單
    if (result.length === 0)
      return res.status(200).json({ success: true, order: [] });

    // 每個order的id
    let id_array = result.map((item) => item.id);

    // 拿到訂單的個別報名人數
    let students = await connection.queryAsync(
      "SELECT COUNT(orders_student.student_id) orders_student_count FROM orders_student WHERE orders_id IN (?) GROUP BY orders_id",
      [id_array]
    );

    // 將個別報名人數塞入各個order detial
    result.forEach((item, index) => {
      item.orders_student_count = students[index].orders_student_count;
    });

    res.status(200).json({ success: true, order: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "G199", message: error });
  }
});

// 編輯訂單評論
router.post("/comment/:orders_id", async (req, res) => {
  let { orders_id } = req.params;
  let { comment, star, course_id } = req.body;

  try {
    // 先確認此訂單為初次評論還是編輯
    let foundComment = await connection.queryAsync(
      "SELECT * FROM course_comment WHERE orders_id = ? AND valid = ?",
      [orders_id, 1]
    );

    // 現在時間
    let now = new Date();

    // 沒找到評論(新增)
    if (foundComment.length === 0) {
      let result = await connection.queryAsync(
        "INSERT INTO course_comment (course_id, orders_id, score, comment_text, created_time, valid) VALUES(?)",
        [[course_id, orders_id, star, comment, now, 1]]
      );
    }
    // 有找到評論(編輯)
    else {
      let result = await connection.queryAsync(
        "UPDATE course_comment SET score = ?, comment_text = ? WHERE orders_id = ?",
        [star, comment, orders_id]
      );
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "G199", message: error });
  }
});

//輸入訂單
router.post("/insertOrderData", async (req, res) => {
  let { memberid,courseid,batchid,firstName,lastName, telephone,birthday,email,paymenttype,receipttype,ordersprice} = req.body.orderdata;
  let now = momnet().format("YYYY-MM-DDTHH:mm:ss");
  try{
    let result = await connection.queryAsync(
      "INSERT INTO orders (member_id, course_id, batch_id, orders_first_name, orders_last_name, orders_telephone, orders_birthdate, orders_email, payment_type, receipt_type, orders_price, created_time, valid) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [memberid,courseid,batchid,firstName,lastName, telephone,birthday,email,paymenttype,receipttype,ordersprice,now,1]
    );
    res.status(200).json({ success: true });
  }catch(error){
    res.status(500).json({ success: false, code: "G999", message: error });
  }
})
module.exports = router;
