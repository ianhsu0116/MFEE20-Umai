const mysql = require("mysql");
const Promise = require("bluebird");

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  // 通常會用設定檔，因為可能會需要根據設備的規格不同而調整
  connectionLimit: process.env.CONNECTION_LIMIT || 10,
  dateStrings: true,
});

// 利用 bluebird 把 connection 的函式都變成 promise
connection = Promise.promisifyAll(connection);

module.exports = connection;
