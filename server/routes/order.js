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
    message: "success",
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
      "SELECT orders_id, COUNT(orders_student.student_id) orders_student_count FROM orders_student WHERE orders_id IN (?) GROUP BY orders_id",
      [id_array]
    );

    // 將 students 按照計數板排好
    let sortedStudents = {};
    students.forEach((item) => {
      sortedStudents[item.orders_id] = item.orders_student_count;
    });

    // 將個別報名人數塞入各個order detial
    result.forEach((item, index) => {
      item.orders_student_count = sortedStudents[item.id];
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
  let {
    memberid,
    courseid,
    batchid,
    first_name,
    last_name,
    telephone,
    birthday,
    email,
    paymenttype,
    receipttype,
    ordersprice,
  } = req.body;
  let now = momnet().format("YYYY-MM-DDTHH:mm:ss");
  try {
    //確認沒有重複的訂單
    //const check = await connection.queryAsync("SELECT * FROM orders WHERE member_id = ? AND course_id = ? AND batch_id = ?",[memberid,courseid,batchid]);

    //輸入訂單
    let result = await connection.queryAsync(
      "INSERT INTO orders (member_id, course_id, batch_id, orders_first_name, orders_last_name, orders_telephone, orders_birthdate, orders_email, payment_type, receipt_type, orders_price, created_time, valid) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        memberid,
        courseid,
        batchid,
        first_name,
        last_name,
        telephone,
        birthday,
        email,
        paymenttype,
        receipttype,
        ordersprice,
        now,
        1,
      ]
    );
    // console.log(result);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, code: "G999", message: error });
  }

  try {
    //檢查訂單數量是否達到給優惠券的條件，若達到給予優惠券
    let checkorder = await connection.queryAsync(
      "SELECT id FROM orders WHERE member_id = ?",
      [memberid]
    );

    if (checkorder.length % 3 === 0) {
      let nowPlus30 = new Date(Date.now() + 2592000000);
      let result = await connection.queryAsync(
        "INSERT INTO member_coupons (member_id, coupons_id, expire_date, status, valid) VALUES(?,?,?,?,?)",
        [memberid, 4, nowPlus30, 1, 1]
      );
    }
  } catch (error) {
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});

//輸入學員資料
router.post("/insertStudentData", async (req, res) => {
  let {
    id,
    memberid,
    first_name,
    last_name,
    telephone,
    birthday,
    email,
    courseid,
    batchid,
    addIntoStudent,
    autoUpdateMember,
  } = req.body;
  let now = momnet().format("YYYY-MM-DDTHH:mm:ss");
  try {
    //確認沒有重複的資料
    // const checkstudent = await connection.queryAsync("SELECT * FROM student WHERE member_id = ? AND first_name = ? AND last_name = ? AND telephone = ? AND birthday = ? AND email = ?",[memberid, first_name, last_name, telephone, birthday, email]);

    //輸入學員資料
    if (id === undefined) {
      if (addIntoStudent) {
        const result = await connection.queryAsync(
          "INSERT INTO student (member_id, first_name, last_name, telephone, birthday, email, created_time, valid) VALUES(?,?,?,?,?,?,?,?)",
          [memberid, first_name, last_name, telephone, birthday, email, now, 1]
        );

        //取得學員id
        const getstudentid = await connection.queryAsync(
          "SELECT id FROM student WHERE member_id = ? AND first_name = ? AND last_name = ? AND telephone = ? AND birthday = ? AND email = ? ORDER BY id DESC",
          [memberid, first_name, last_name, telephone, birthday, email]
        );
        studentid = getstudentid[0]["id"];
      } else {
        const result = await connection.queryAsync(
          "INSERT INTO student (member_id, first_name, last_name, telephone, birthday, email, created_time, valid) VALUES(?,?,?,?,?,?,?,?)",
          [null, first_name, last_name, telephone, birthday, email, now, 1]
        );

        //取得學員id
        const getstudentid = await connection.queryAsync(
          "SELECT id FROM student WHERE  first_name = ? AND last_name = ? AND telephone = ? AND birthday = ? AND email = ? ORDER BY id DESC",
          [first_name, last_name, telephone, birthday, email]
        );
        studentid = getstudentid[0]["id"];
      }
    } else {
      if (autoUpdateMember) {
        const result = await connection.queryAsync(
          "UPDATE student SET first_name = ?, last_name = ?, telephone = ?, birthday = ?, email = ? WHERE id = ? AND member_id = ?",
          [first_name, last_name, telephone, birthday, email, id, memberid]
        );
        //取得學員id
        const getstudentid = await connection.queryAsync(
          "SELECT id FROM student WHERE member_id = ? AND first_name = ? AND last_name = ? AND telephone = ? AND birthday = ? AND email = ? ORDER BY id DESC",
          [memberid, first_name, last_name, telephone, birthday, email]
        );
        studentid = getstudentid[0]["id"];
      }
    }

    //取得訂單id
    const getorderid = await connection.queryAsync(
      "SELECT id FROM orders WHERE member_id = ? AND course_id = ? AND batch_id = ? ORDER BY id DESC",
      [memberid, courseid, batchid]
    );
    const orderid = getorderid[0]["id"];

    //確認是否連結
    const checkorders_student = await connection.queryAsync(
      "SELECT * FROM orders_student WHERE orders_id = ? AND student_id = ?",
      [orderid, studentid]
    );

    //輸入學員資料
    if (checkorders_student.length === 0) {
      const result = await connection.queryAsync(
        "INSERT INTO orders_student (orders_id, student_id) VALUES(?,?)",
        [orderid, studentid]
      );
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, code: "G999", message: error });
  }

  //將訂單與學員連結
  // try {
  //   //取得學員id
  //   const getstudentid = await connection.queryAsync(
  //     "SELECT id FROM student WHERE member_id = ? AND first_name = ? AND last_name = ? AND telephone = ? AND birthday = ? AND email = ?",
  //     [memberid, first_name, last_name, telephone, birthday, email]
  //   );
  //   const studentid = getstudentid[0]["id"];

  //   //取得訂單id
  //   const getorderid = await connection.queryAsync(
  //     "SELECT id FROM orders WHERE member_id = ? AND course_id = ? AND batch_id = ? ORDER BY id DESC",
  //     [memberid, courseid, batchid]
  //   );
  //   console.log(getorderid);
  //   const orderid = getorderid[0]["id"];

  //   //確認是否連結
  //   const checkorders_student = await connection.queryAsync(
  //     "SELECT * FROM orders_student WHERE orders_id = ? AND student_id = ?",
  //     [orderid, studentid]
  //   );

  //   //輸入學員資料
  //   if (checkorders_student.length === 0) {
  //     const result = await connection.queryAsync(
  //       "INSERT INTO orders_student (orders_id, student_id) VALUES(?,?)",
  //       [orderid, studentid]
  //     );
  //   }
  //   res.status(200).json({ success: true });
  // } catch (error) {
  //   res.status(500).json({ success: false, code: "G999", message: error });
  // }
});

//修改課程剩餘人數
router.put("/modifyMembercount", async (req, res) => {
  let { studentnumber, courseid, batchid } = req.body;

  try {
    //取得課程剩餘人數並增加訂單人數
    const getmembercount = await connection.queryAsync(
      "SELECT member_count FROM course_batch WHERE course_id = ? AND id = ?",
      [courseid, batchid]
    );
    const membercount = getmembercount[0]["member_count"];
    let newmembercount = membercount + studentnumber;

    const modifymembercount = await connection.queryAsync(
      "UPDATE course_batch SET member_count = ? WHERE course_id = ? AND id = ?",
      [newmembercount, courseid, batchid]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});

//將訂單移除購物車
router.put("/modifycart", async (req, res) => {
  let { memberid, courseid, batchid } = req.body;

  try {
    const modifymembercount = await connection.queryAsync(
      "UPDATE cart_and_collection SET inCart = 0 WHERE member_id = ? AND course_id = ? AND batch_id = ?",
      [memberid, courseid, batchid]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});

//將訂單加入收藏
router.put("/modifycollection", async (req, res) => {
  let { memberid, courseid } = req.body;
  try {
    const checkcollection = await connection.queryAsync(
      "SELECT * FROM cart_and_collection WHERE member_id = ? AND course_id = ?",
      [memberid, courseid]
    );
    console.log(checkcollection);
    if (checkcollection.length !== 0) {
      const modifymembercount = await connection.queryAsync(
        "UPDATE cart_and_collection SET inCollection = 1 WHERE member_id = ? AND course_id = ? AND id = ?",
        [memberid, courseid, checkcollection[0]["id"]]
      );
    } else {
      const modifymembercount = await connection.queryAsync(
        "INSERT INTO cart_and_collection (member_id, course_id,batch_id,inCart,inCollection) VALUES(?,?,?,?,?)",
        [memberid, courseid, null, 0, 1]
      );
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});

//移除優惠券
router.put("/modifycoupon", async (req, res) => {
  let { id, memberid, couponsid } = req.body;

  try {
    const modifymembercount = await connection.queryAsync(
      "UPDATE member_coupons SET status = 2 WHERE id = ? AND member_id = ? AND coupons_id = ?",
      [id, memberid, couponsid]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, code: "G999", message: error });
  }
});

module.exports = router;
