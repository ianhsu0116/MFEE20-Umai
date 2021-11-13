const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");

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
let FileStore = require("session-file-store")(session);
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 登入認證相關的路由
const authRoute = require("./routes").auth;
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
