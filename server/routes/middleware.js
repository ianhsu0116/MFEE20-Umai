const router = require("express").Router();

// 確認是否登入
router.use((req, res, next) => {
  if (!req.session.member) {
    return res.status(403).send({ success: false, code: "A005" });
  }

  next();
});

module.exports = router;
