const router = require("express").Router();
const authCheck = require("./middleware");
const path = require("path");
const connection = require("../utils/database");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const momnet = require("moment");
const { courseValidation } = require("../validation");

// ================routes=====================

router.use((req, res, next) => {
  console.log("有一請求進入courseRoute");
  next();
});

// 阻擋未登入的請求 => 改成在個別路由中增加，因為在首頁不需登入也可以顯示課程資訊

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

// getAllCourseObject
// 根據member_id拿到購物車所需的全部課程資料 (cart)
router.get("/cart/all/:member_id", async (req, res) => {
  let { member_id } = req.params;
  console.log("[function] getAllCourseObject");
  console.log(`- 用member_id取得購物車中的課程資料`);

  try {
    // 獲得所有加入購物車的梯次id
    let inCart = await connection.queryAsync(
      `SELECT cart_and_collection.batch_id FROM cart_and_collection WHERE cart_and_collection.inCart = 1 AND cart_and_collection.member_id = ?`,
      [member_id]
    );
    console.log("inCart");
    console.log(inCart);

    let batchIds = [];
    let courseInfoInCart = [];

    if (inCart.length !== 0) {
      // 生成梯次id陣列
      batchIds = inCart.map((obj) => {
        return obj.batch_id;
      });
      // 刪除陣列中重複梯次id(保留最初加入的資料)(避免資料庫錯誤出現多筆同梯次資料)
      batchIds = batchIds.filter(function (ele, idx) {
        return batchIds.indexOf(ele) == idx;
      });
      console.log("batchIds");
      console.log(batchIds);

      // 若沒課程加入購物車則回傳空值
      if (batchIds.length === 0) res.status(200).json({ success: true });

      // 拿到課程資料(course JOIN course_batch JOIN cart_and_collection)(an array of objects)
      const set = new Set();
      courseInfoInCart = await connection.queryAsync(
        "SELECT DISTINCT course.id AS course_id, course.course_image, course.course_name, course.course_price, course.member_limit, course_batch.id AS batch_id, course_batch.batch_date, course_batch.member_count, cart_and_collection.member_id, cart_and_collection.amount FROM course, course_batch, cart_and_collection WHERE course.id = course_batch.course_id AND cart_and_collection.batch_id = course_batch.id AND course_batch.id IN (?) AND cart_and_collection.member_id IN (?) AND course_batch.valid = 1 AND cart_and_collection.inCart = 1 ORDER BY course.id ASC, course_batch.batch_date ASC",
        [batchIds, member_id]
      );
      // 刪除陣列中重複資料(根據batch_id判斷)(避免資料庫錯誤出現多筆同梯次資料)
      courseInfoInCart = courseInfoInCart.filter((obj) =>
        !set.has(obj.batch_id) ? set.add(obj.batch_id) : false
      );
      console.log("courseInfoInCart");
      console.log(courseInfoInCart);
    } else {
      console.log("No course in ShoppingCart.");
    }

    res.status(200).json({ success: true, batchIds, courseInfoInCart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "E999", message: error });
  }
});

// getOneCourseObject
// 根據course_id與batch_id拿到購物車所需的單筆課程資料 (cart)
router.get("/cart/:course_id/:batch_id", async (req, res) => {
  let { course_id, batch_id } = req.params;
  console.log("getOneCourseObject");

  try {
    // 拿到課程資料與梯次(join course_batch)
    let courseInfoInCart = await connection.queryAsync(
      "SELECT course.id AS course_id, course.course_image, course.course_name, course.course_price, course.member_limit, course_batch.id AS batch_id, course_batch.batch_date, course_batch.member_count, cart_and_collection.member_id, cart_and_collection.amount FROM course, course_batch, cart_and_collection WHERE course.id = course_batch.course_id = cart_and_collection.course_id AND course.id = ? AND course_batch.id = ? AND course.valid = ? AND course_batch.valid = ?",
      [course_id, batch_id, 1, 1]
    );

    // Testing
    console.log("getOneCourseObject Done");
    console.log("courseInfoInCart");
    console.log(courseInfoInCart[0]);
    // {course_image, course_name, course_price, member_limit, batch_date, member_count}
    res.status(200).json({ success: true, courseInfoInCart });
  } catch (error) {
    console.log(error);
    res.status(200).json({ success: true, message: "此課程未曾加入購物車" });
  }
});

// IfCourseInCart
//檢查購物車資料庫中是否已經有此課程
router.get("/cart/:member_id/:course_id/:batch_id", async (req, res) => {
  let { member_id, course_id, batch_id } = req.params;
  try {
    // 待改成「判斷是否有任何項目的batch_id為Null，有的話將所有batch_id=Null的項目刪到剩一筆，並將目前的batch_id存進這一筆裡面，同時將此筆的inCart改成1」
    // let inCart = await connection.queryAsync(
    //   `SELECT cart_and_collection.inCart cart_and_collectionbatch_id FROM cart_and_collection WHERE AND member_id = ? AND course_id = ?`,
    //   [member_id, course_id]
    // );
    let inCart = await connection.queryAsync(
      `SELECT cart_and_collection.inCart FROM cart_and_collection WHERE member_id = ? AND course_id = ? AND batch_id = ?`,
      [member_id, course_id, batch_id]
    );
    console.log("inCart: ");
    console.log(inCart[0]?.inCart);
    res.status(200).json({ success: true, inCart });

    // Testing
    // console.log("檢查購物車資料庫中是否已經有此課程");
    // console.log("member_id, course_id, batch_id: ");
    // console.log(member_id, course_id, batch_id);
    // console.log("inCart");
    // console.log(inCart[0]?.inCart);
    // inCart[0]?.inCart === 1
    //   ? console.log("此課程曾被加入購物車，且已在購物車中")
    //   : inCart[0]?.inCart === 0
    //   ? console.log("此課程曾被加入購物車，但目前不在購物車中")
    //   : console.log("此課程從未被選購過");
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "E999", message: error });
  }
});

// UpdateCart
// 根據member_id, course_id, batch_id更新購物車資料庫
router.put("/cart/:member_id", async (req, res) => {
  let { member_id } = req.params;
  let { course_id, batch_id, inCart, updateAmount } = req.body;

  try {
    // 檢查購物車資料庫中是否已經有此課程
    let ifInCart = await connection.queryAsync(
      `SELECT cart_and_collection.inCart, cart_and_collection.amount FROM cart_and_collection WHERE member_id = ? AND course_id = ? AND batch_id = ?`,
      [member_id, course_id, batch_id]
    );
    if (ifInCart[0]?.inCart === undefined) {
      // console.log("inCart === undefined");
      // 若不存在於購物車資料庫中，加入資料庫
      let addResult = await connection.queryAsync(
        "INSERT INTO cart_and_collection (member_id, course_id, batch_id, inCart) VALUE (?, ?, ?, 1)",
        [member_id, course_id, batch_id]
      );
    } else if (ifInCart[0]?.inCart === 1) {
      let amount = ifInCart[0]?.amount + updateAmount;
      // console.log("inCart === 1");
      // console.log("amount: ");
      // console.log(amount);
      // 若存在於購物車中，更新資料庫數量
      let update = await connection.queryAsync(
        `UPDATE cart_and_collection SET amount = ?, inCart=? WHERE member_id = ? AND course_id = ? AND batch_id = ?`,
        [amount, inCart, member_id, course_id, batch_id]
      );
    } else if (ifInCart[0]?.inCart === 0) {
      // console.log("inCart === 0");
      // 若存在於購物車資料庫中，更新資料庫
      let update = await connection.queryAsync(
        `UPDATE cart_and_collection SET inCart = ? WHERE member_id = ? AND course_id = ? AND batch_id = ?`,
        [inCart, member_id, course_id, batch_id]
      );
    }
    // 回傳資料庫目前狀態
    let updateResult = await connection.queryAsync(
      `SELECT cart_and_collection.inCart, cart_and_collection.amount, cart_and_collection.member_id, cart_and_collection.course_id, cart_and_collection.batch_id, cart_and_collection.amount FROM cart_and_collection WHERE member_id = ? AND course_id = ? AND batch_id = ?`,
      [member_id, course_id, batch_id]
    );

    // Testing
    // console.log("UpdateCart Done");
    // console.log("updateResult");
    // console.log(updateResult[0].updateResult);
    res.status(200).json({ success: true, updateResult });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "E999", message: error });
  }
});

// 根據course_name拿到搜尋結果的課程資料(cart)
router.get("/", async (req, res) => {
  let { search } = req.params;

  try {
    // 拿到課程資料與梯次(join course_batch)
    let courseSearch = await connection.queryAsync(
      `SELECT course.course_name FROM course WHERE course.course_name LIKE "%料理%" ORDER BY course.course_name ASC`
    );

    console.log(courseInfoInCart);
    res.status(200).json({ success: true, courseSearch });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ success: false, code: "E999", message: error });
  }
});
// CourseSearch(searchValue) {

// 依照member_id (一般會員) 拿到此會員收藏的課程 (課程卡片形式)
router.get("/collection/:member_id", async (req, res) => {
  let { member_id } = req.params;

  try {
    // 抓到此會員的所有收藏課程
    let collections = await connection.queryAsync(
      "SELECT course_id FROM cart_and_collection WHERE member_id = ? AND inCollection = 1 ORDER BY id desc",
      [member_id]
    );

    // 如果沒有任何收藏的話
    if (collections.length === 0)
      return res.status(204).json({ success: true, course: [] });

    // 將其變成單純的 ARRAY OF ID
    collections = collections.map((item) => item.course_id);

    // 依序抓到每筆課程
    let result = await connection.queryAsync(
      "SELECT course.*, course_category.category_name, member.first_name, member.last_name, SUM(course_comment.score) AS score_sum, COUNT(course_comment.score) AS score_count FROM course JOIN course_category ON course.category_id = course_category.id LEFT JOIN course_comment ON course.id = course_comment.course_id JOIN member ON course.member_id = member.id WHERE course.id IN (?) AND course.valid = ? GROUP BY course.id",
      [collections, 1]
    );

    // 將找到的課程按照加入購物車的順序排好
    let sortedResult = [];
    collections.forEach((id, index) => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].id === id) {
          sortedResult.push(result[i]);
          break;
        }
      }
    });
    result = sortedResult;

    // 每個課程的id
    let id_array = result.map((item) => item.id);
    // 裝所有個別課程的最近一筆梯次的Array
    let closest_batchs = [];
    // 現在時間
    let now = new Date();

    // 抓到每筆課程的每個梯次(今日以後的所有梯次)
    let batchs = await connection.queryAsync(
      `SELECT id AS batch_id, course_id, batch_date, member_count FROM course_batch WHERE course_id IN (?) AND valid = ? AND batch_date > ? `,
      [id_array, 1, now]
    );

    // 根據每個course_id 抓出此課程的最近一比梯次
    id_array.forEach((course_id) => {
      for (let i = 0; i < batchs.length; i++) {
        if (course_id == batchs[i].course_id) {
          closest_batchs.push(batchs[i]);
          break;
        }

        // 如果沒一個符合(代表沒有可報名的梯次)，則回傳空值
        if (i === batchs.length - 1) {
          closest_batchs.push({
            batch_id: null,
            course_id,
            batch_date: null,
            member_count: 0,
          });
        }
      }
    });

    // 把梯次依序裝入course的json中
    closest_batchs.forEach((item, index) => {
      result[index].closest_batchs = item;
    });

    //console.log(result);

    res.status(200).json({ success: true, course: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "E999", message: error });
  }
});

//搜尋課程
router.post("/searchcourse", async (req, res) => {
  let { searchValue } = req.body;
  console.log(searchValue);
  try {
    let course = await connection.queryAsync(
      `SELECT * FROM course WHERE course_name LIKE '%${searchValue}%'`
    );
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, code: "E999", message: error });
  }
});

// 依照member_id (主廚) 拿取課程資料 (課程卡片形式)
// (有join category, comment => 抓評分, batch的最近一批梯次)
router.get("/member/:member_id", async (req, res) => {
  let { member_id } = req.params;

  try {
    // 依序抓到每筆課程
    let result = await connection.queryAsync(
      "SELECT course.*, course_category.category_name, member.first_name, member.last_name, SUM(course_comment.score) AS score_sum, COUNT(course_comment.score) AS score_count FROM course JOIN course_category ON course.category_id = course_category.id LEFT JOIN course_comment ON course.id = course_comment.course_id JOIN member ON course.member_id = member.id WHERE course.member_id = ? AND course.valid = ? GROUP BY course.id",
      [member_id, 1]
    );

    // 如果沒有任何課程的話
    if (result.length === 0)
      return res.status(204).json({ success: true, course: [] });

    // 每個課程的id
    let id_array = result.map((item) => item.id);
    // 裝所有個別課程的最近一筆梯次的Array
    let closest_batchs = [];
    // 現在時間
    let now = new Date();

    // 抓到每筆課程的每個梯次(今日以後的所有梯次)
    let batchs = await connection.queryAsync(
      `SELECT id AS batch_id, course_id, batch_date, member_count FROM course_batch WHERE course_id IN (?) AND valid = ? AND batch_date > ? `,
      [id_array, 1, now]
    );

    // 根據每個course_id 抓出此課程的最近一比梯次
    id_array.forEach((course_id) => {
      for (let i = 0; i < batchs.length; i++) {
        if (course_id == batchs[i].course_id) {
          closest_batchs.push(batchs[i]);
          break;
        }

        // 如果沒一個符合(代表沒有可報名的梯次)，則回傳空值
        if (i === batchs.length - 1) {
          closest_batchs.push({
            batch_id: null,
            course_id,
            batch_date: null,
            member_count: 0,
          });
        }
      }
    });

    // 把梯次依序裝入course的json中
    closest_batchs.forEach((item, index) => {
      result[index].closest_batchs = item;
    });

    res.status(200).json({ success: true, course: result });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ success: false, code: "E999", message: error });
  }
});

// 隨機抓三筆推薦
router.get("/course/recommend", async (req, res) => {
  try {
    let recommend = await connection.queryAsync(
      "Select course.* From course Where valid = 1 ORDER BY RAND() LIMIT 3"
    );
    res.status(200).json({ success: true, recommend });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "E999", message: error });
  }
});
// // 隨機抓一筆 首頁
// router.get("/hottest", async (req, res) => {
//   try {
//     let homepage = await connection.queryAsync(
//       "Select course.* , member.first_name , member.last_name From course , member   Where member.id = course.member_id AND course.valid = 1 ORDER BY RAND() LIMIT 1"
//     );
//     // console.log(homepage)
//     res.status(200).json({ success: true, homepage });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, code: "E999", message: error });
//   }
// });

// 新增課程
router.post("/", authCheck, uploader.array("images"), async (req, res) => {
  // 先判斷格式是否正確
  let { error } = courseValidation(req.body);
  if (error) {
    let { key } = error.details[0].context;
    let code;
    switch (key) {
      case "category_id":
        code = "E101";
        break;
      case "course_name":
        code = "E102";
        break;
      case "course_price":
        code = "E103";
        break;
      case "course_hour":
        code = "E104";
        break;
      case "course_level":
        code = "E105";
        break;
      case "member_limit":
        code = "E106";
        break;
      case "company_name":
        code = "E107";
        break;
      case "company_address":
        code = "E108";
        break;
      case "course_batch":
        code = "E109";
        break;
      case "course_detail":
        code = "E110";
        break;
      default:
        code = "E999";
        break;
    }

    return res.status(403).json({ success: false, code });
  }

  let { id } = req.session.member;
  let now = momnet().format("YYYY-MM-DDTHH:mm:ss");
  let {
    category_id,
    course_name,
    course_price,
    course_hour,
    course_level,
    member_limit,
    company_name,
    company_address,
    course_batch,
    course_detail,
  } = req.body;

  // 課程卡片首圖預設值
  let course_image;

  // 將JSON解析回原本的data type
  course_batch = JSON.parse(course_batch);
  course_detail = JSON.parse(course_detail);

  // 處理每張相片的名稱
  req.files.forEach((file, index) => {
    if (index <= 5) {
      course_detail.six_dishes[index].dishes_image = file.filename;
    } else {
      course_detail.slider_images.push(file.filename);
    }

    // 課程卡片的首圖 (拿slider的第一張圖來用)
    if (index === 6) {
      course_image = file.filename;
    }
  });

  // JSON打包好後，再stringify，才能存入DB
  course_detail = JSON.stringify(course_detail);

  // 存入資料庫
  try {
    // 存入資料庫（課程）
    let result = await connection.queryAsync(
      "INSERT INTO course (member_id,category_id,course_detail,course_image,course_name,course_price,course_hour,course_level,member_limit,company_name,company_address, created_time, valid) VALUES (?)",
      [
        [
          id,
          category_id,
          course_detail,
          course_image,
          course_name,
          course_price,
          course_hour,
          course_level,
          member_limit,
          company_name,
          company_address,
          now,
          1,
        ],
      ]
    );

    // 拿到當下新增的course_id
    let { insertId } = result;

    // 存入資料庫（梯次 批次存入）
    course_batch.forEach(async (batch) => {
      await connection.queryAsync(
        "INSERT INTO course_batch (course_id, batch_date, member_count, created_time, valid) VALUES (?)",
        [[insertId, batch, 0, now, 1]]
      );
    });

    res.status(200).json({ success: true });
  } catch (error) {
    //console.log(error);
    res.status(500).json({ success: false, code: "E999", message: error });
  }
});

// 移除或新增收藏課程
router.post("/collection/:member_id", async (req, res) => {
  let { member_id } = req.params;
  let { course_id, type } = req.body;

  // type => true: 移除收藏; false: 加入收藏
  if (type) {
    try {
      let result = await connection.queryAsync(
        "UPDATE cart_and_collection SET inCollection = ? WHERE member_id = ? AND course_id = ?",
        [0, member_id, course_id]
      );

      res.status(200).json({ success: true });
    } catch (error) {
      //console.log(error);
      res.status(500).json({ success: false, code: "E999", message: error });
    }
  } else {
    try {
      let result = await connection.queryAsync(
        "INSERT INTO cart_and_collection (member_id, course_id, inCollection) VALUES (?)",
        [[member_id, course_id, 1]]
      );

      res.status(200).json({ success: true });
    } catch (error) {
      //console.log(error);
      res.status(500).json({ success: false, code: "E999", message: error });
    }
  }
  // 全課程
  router.get("/homepage/course_id", async (req, res) => {
    let { category_id } = req.params;

    try {
      // 種類
      let category_count = await connection.queryAsync(
        "SELECT category_name FROM course_category WHERE id=? AND valid = 1",
        [category_id, 1]
      );
      let category_detail = await connection.queryAsync(
        "SELECT course.*, course_category.category_name, member.first_name, member.last_name, SUM(course_comment.score) AS score_sum, COUNT(course_comment.score) AS score_count FROM course JOIN course_category ON course.category_id = course_category.id LEFT JOIN course_comment ON course.id = course_comment.course_id JOIN member ON course.member_id = member.id WHERE course.category_id = ? AND course.valid = ? GROUP BY course.id",
        [category_id, 1]
      );
      if (category_id == 7)
        category_detail = await connection.queryAsync(
          "SELECT course.*, course_category.category_name, member.first_name, member.last_name, SUM(course_comment.score) AS score_sum, COUNT(course_comment.score) AS score_count FROM course JOIN course_category ON course.category_id = course_category.id LEFT JOIN course_comment ON course.id = course_comment.course_id JOIN member ON course.member_id = member.id WHERE  course.valid = 1 GROUP BY course.id",
          [category_id, 1]
        );
      // 每個課程的id
      let id_array = category_detail.map((item) => item.id);
      // 裝所有個別課程的最近一筆梯次的Array
      let closest_batchs = [];
      // 現在時間
      let now = new Date();
      // 抓到每筆課程的每個梯次(今日以後的所有梯次)
      let batchs = await connection.queryAsync(
        `SELECT id AS batch_id, course_id, batch_date, member_count FROM course_batch  WHERE course_id IN (?) AND valid = ? AND batch_date > ? `,
        [id_array, 1, now]
      );
      // 根據每個course_id 抓出此課程的最近一比梯次
      id_array.forEach((course_id) => {
        for (let i = 0; i < batchs.length; i++) {
          // console.log(batchs)
          if (course_id == batchs[i].course_id) {
            closest_batchs.push(batchs[i]);
            break;
          }

          // 全跑完還是不符合
          if (i === batchs.length - 1) {
            closest_batchs.push({
              batch_id: null,
              course_id,
              batch_date: null,
              member_count: 0,
            });
          }
        }
      });
      // 把梯次依序裝入course的json中
      closest_batchs.forEach((item, index) => {
        console.log(item);
        category_detail[index].closest_batchs = item;
        console.log(index);
      });

      // console.log(id_array)
      console.log(category_detail);
      res.status(200).json({
        success: true,
        categoryID: category_count,
        courseDetail: category_detail,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, code: "G999", message: error });
    }
  });
});

//首頁抓三評論
router.get("/homepage/comment", async (req, res) => {
  try {
    // 依序抓到每筆課程
    let result = await connection.queryAsync(
      "SELECT course_comment.* , course.course_name ,  orders.member_id , member.first_name , member.last_name , member.avatar FROM course_comment , orders , member , course WHERE course.id = course_comment.course_id  AND member.id = orders.member_id AND course_comment.orders_id = orders.id  AND course_comment.valid = 1 ORDER BY course_comment.id DESC LIMIT 3"
    );
    res.status(200).json({ success: true, course: result });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "E999", message: error });
  }
});

// 熱門的八堂課
router.get("/hottest", async (req, res) => {
  try {
    // 依序抓到每筆課程
    let result = await connection.queryAsync(
      "SELECT course.*, course_category.category_name, member.first_name, member.last_name, SUM(course_comment.score) AS score_sum, COUNT(course_comment.score) AS score_count FROM course JOIN course_category ON course.category_id = course_category.id LEFT JOIN course_comment ON course.id = course_comment.course_id JOIN member ON course.member_id = member.id WHERE  course.valid = ? GROUP BY course.id ORDER BY RAND()",
      [1]
    );

    // 每個課程的id
    let id_array = result.map((item) => item.id);
    // 裝所有個別課程的最近一筆梯次的Array
    let closest_batchs = [];
    // 現在時間
    let now = new Date();

    // 抓到每筆課程的每個梯次(今日以後的所有梯次)
    let batchs = await connection.queryAsync(
      `SELECT id AS batch_id, course_id, batch_date, member_count FROM course_batch WHERE course_id IN (?) AND valid = ? AND batch_date > ? `,
      [id_array, 1, now]
    );

    // 根據每個course_id 抓出此課程的最近一比梯次
    id_array.forEach((course_id) => {
      for (let i = 0; i < batchs.length; i++) {
        if (course_id == batchs[i].course_id) {
          closest_batchs.push(batchs[i]);
          break;
        }

        // 如果沒一個符合(代表沒有可報名的梯次)，則回傳空值
        if (i === batchs.length - 1) {
          closest_batchs.push({
            batch_id: null,
            course_id,
            batch_date: null,
            member_count: 0,
          });
        }
      }
    });

    // 把梯次依序裝入course的json中
    closest_batchs.forEach((item, index) => {
      result[index].closest_batchs = item;
    });

    res.status(200).json({ success: true, course: result });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, code: "E999", message: error });
  }
});

// 依照課程id拿到課程詳細資料 (課程詳細頁) (包含課程詳細，所有梯次，主廚介紹)
router.get("/:course_id", async (req, res) => {
  let { course_id } = req.params;
  console.log("test");

  try {
    // 拿到課程詳細資料(有join category, member)
    let course = await connection.queryAsync(
      "SELECT course.*, course_category.category_name, member.id, member.first_name, member.last_name, member.chef_introduction , member.avatar FROM course, course_category, member WHERE course.category_id = course_category.id AND course.member_id = member.id AND course.id = ? AND course.valid = ?",
      [course_id, 1]
    );

    // 課程的所有梯次
    let course_batch = [];
    if (course.length !== 0) {
      course_batch = await connection.queryAsync(
        "SELECT course_batch.*  FROM course_batch WHERE course_id = ? AND valid = 1",
        [course_id, 1]
      );
    }

    //拿到課程討論的各種資料
    let course_comment = [];
    if (course.length !== 0) {
      course_comment = await connection.queryAsync(
        "SELECT course_comment.* , orders.member_id , member.first_name , member.last_name , member.avatar FROM course_comment , orders , member WHERE member.id = orders.member_id AND course_comment.orders_id = orders.id  AND  course_comment.course_id = ? AND course_comment.valid = 1",
        [course_id, 1]
      );
    }

    res
      .status(200)
      .json({ success: true, course, course_batch, course_comment });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ success: false, code: "E999", message: error });
  }
});

module.exports = router;
