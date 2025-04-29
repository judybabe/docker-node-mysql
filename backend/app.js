const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// 設定資料庫連線（主機用 mysql --> 等下Compose會自動解析）
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // 這邊填 "mysql"（service 名稱）
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// 測試資料庫連線
db.connect(err => {
  if (err) {
    console.error('資料庫連線失敗:', err);
    return;
  }
  console.log('資料庫連線成功！');
});

// 路由
app.get('/', (req, res) => {
  db.query('SELECT NOW() AS now', (err, results) => {
    if (err) throw err;
    res.send(`Database time: ${results[0].now}`);
  });
});

// 啟動 Server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});