const express = require("express");
const app = express();
require("dotenv").config();
const connection = require("./utils/database");
const cors = require("cors");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
require("./config/passport")(passport);

app.use((req, res, next) => {
  let current = new Date();
  console.log("有人來訪" + current.toLocaleString());
  next();
});

app.use(
  cors({
    // 因為開放跨源讀寫 cookie，所以必須要設定好源(origin)
    // 限定來源
    origin: ["http://localhost:3000"],
    // 允許跨源存取 cookie
    credentials: true,
  })
);

const path = require("path");
app.use(
  session({
    // store: 指定要把 session 存在哪裡，預設是 memory
    store: new FileStore({ path: path.join(__dirname, "..", "sessions") }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// 登入註冊相關的路由
const authRoute = require("./routes").auth;
app.use("/api/auth", authRoute);

// 會員資料相關的路由
const memberRoute = require("./routes").member;
app.use("/api/member", memberRoute);

// 課程相關的路由
const courseRoute = require("./routes").course;
app.use("/api/course", courseRoute);

// 訂單相關的路由
const orderRoute = require("./routes").order;
app.use("/api/order", orderRoute);

app.get("/", (req, res) => {
  res.send("home");
});

// 錯誤處理
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ success: false, code: "不知名錯誤！", message: err });
});

app.listen(3001, () => {
  connection.connect();
  console.log("server is running on port 8080");
});
