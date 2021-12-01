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
    console.log("有一請求進入categoryRoute");
    next();
  });

  router.get("/:category_id", async (req, res) => {
    let { category_id } = req.params;
  
    try {
      // 種類
      let category_count = await connection.queryAsync(
        "SELECT category_name FROM course_category WHERE id=? AND valid = 1",
        [category_id , 1]
      );
      let category_detail = await connection.queryAsync(
        "SELECT course.*, course_category.category_name, member.first_name, member.last_name, SUM(course_comment.score) AS score_sum, COUNT(course_comment.score) AS score_count FROM course JOIN course_category ON course.category_id = course_category.id LEFT JOIN course_comment ON course.id = course_comment.course_id JOIN member ON course.member_id = member.id WHERE course.category_id = ? AND course.valid = ? GROUP BY course.id",
        [category_id, 1]
      )
      if(category_id == 7)
      category_detail = await connection.queryAsync(
        "SELECT course.*, course_category.category_name, member.first_name, member.last_name, SUM(course_comment.score) AS score_sum, COUNT(course_comment.score) AS score_count FROM course JOIN course_category ON course.category_id = course_category.id LEFT JOIN course_comment ON course.id = course_comment.course_id JOIN member ON course.member_id = member.id WHERE  course.valid = 1 GROUP BY course.id",
          [category_id, 1]
        )
      let collections = await connection.queryAsync(
        "SELECT course_id FROM cart_and_collection WHERE member_id = 1 AND inCollection = 1 ",
        [category_id, 1]
      );
      // 如果沒有任何收藏的話
      if (collections.length === 0)
        return res.status(204).json({ success: true, course: [] });
        // 每個課程的id
        let id_array = category_detail.map((item) => item.id);
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
         }
        });
          // 把梯次依序裝入course的json中
    closest_batchs.forEach((item, index) => {
      category_detail[index].closest_batchs = item;
    });
      console.log(closest_batchs)
      res.status(200).json({ success: true, categoryID: category_count , courseDetail:category_detail });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, code: "G999", message: error });
    }
  });

  router.get("/courses/categoryLength", async (req, res) => {
    let { id } = req.params;
  
    try {
      let result = await connection.queryAsync(
        "SELECT category_name FROM course_category WHERE  valid = 1",
        [id, 1]
      );
  
      res.status(200).json({ success: true, category_length: result });
    } catch (error) {
      //console.log(error);
      res.status(500).json({ success: false, code: "G999", message: error });
    }
  });

  // router.get("/courses/:category", async (req, res) => {
  //   let { category_class } = req.params;
  
  //   try {
  //     let result = await connection.queryAsync(
  //       "SELECT course.* FROM course  WHERE id = ? AND valid = 1 ",
  //       [category_class, 1]
        
  //     );
  //     console.log(category_class)

  //     res.status(200).json({ success: true, course: result });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ success: false, code: "E999", message: error });
  //   }
  // });
  

  module.exports = router;
  