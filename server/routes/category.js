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

  module.exports = router;
  