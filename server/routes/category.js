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
      let result = await connection.queryAsync(
        "SELECT category_name FROM course_category WHERE id=? AND valid = 1",
        [category_id , 1]
      );
      console.log(category_id)
      res.status(200).json({ success: true, categoryID: result });
    } catch (error) {
      //console.log(error);
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

  router.get("/courses/:category", async (req, res) => {
    let { category_class } = req.params;
  
    try {
      // 抓到此會員的所有收藏課程
      let collections = await connection.queryAsync(
        "SELECT course_id FROM cart_and_collection WHERE member_id = ?ORDER BY id desc",
        [category_class_id]
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
        }
      });
  
      // 把梯次依序裝入course的json中
      closest_batchs.forEach((item, index) => {
        result[index].closest_batchs = item;
      });
  
      res.status(200).json({ success: true, course: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, code: "E999", message: error });
    }
  });
  

  module.exports = router;
  