const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// 'assets' 폴더와 'public' 폴더에 있는 정적 파일 제공
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(__dirname));

// 기본 경로에서 index.html 제공
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
