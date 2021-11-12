const router = require("express").Router();
const bcrypt = require("bcrypt");

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is working",
  };
  // res.json() 跟 res.send() 雷同，不過json是送出一個json格式的object
  return res.json(msgObj);
});

module.exports = router;
