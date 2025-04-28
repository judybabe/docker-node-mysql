const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// 設定資料庫連線（主機用 mysql --> 等下Compose會自動解析）
const db = mysql.createConnection({
  host: 'mysql',       // 這邊填 "mysql"（service 名稱）
  user: 'root',
  password: 'password',
  database: 'testdb'
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