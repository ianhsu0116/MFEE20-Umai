const router = require("express").Router();

router.use((req, res, next) => {
  if (!req.session.member) {
    return res.status(403).send({ success: false, code: "A005" });
  }

  next();
});

module.exports = router;
