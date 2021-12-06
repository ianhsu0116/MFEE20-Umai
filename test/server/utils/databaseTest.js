const mysql = require("mysql");
const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  // 通常會用設定檔，因為可能會需要根據設備的規格不同而調整
  connectionLimit: process.env.CONNECTION_LIMIT || 10,
  // 無可用連線時是否等待pool連線釋放(預設為true)
  waitForConnections: true,
  dateStrings: true,
});

class connection {
  getConnection(sqlCommand) {
    console.log("test 1");

    // 取得連線池的連線
    connectionPool.getConnection(sqlCommand, function (err, connection) {
      console.log("test 2-1");
      if (err) {
        // 取得可用連線出錯
      } else {
        console.log("test 2-2");
        // 成功取得可用連線
        // 使用取得的連線
        if (sqlCommand) {
          // new Promise((resolve, reject) => {
          connection.query(sqlCommand, function (err, rows) {
            // 使用連線查詢完資料
            // 釋放連線
            connection.release();
            // 不要再使用釋放過後的連線了，這個連線會被放到連線池中，供下一個使用者使用
          });
          // });
        }
      }
    });
    console.log("test 3");
  }
}

module.exports = new connection();
