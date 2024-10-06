const express = require('express');
const app = express();
require('dotenv').config({ path: './config.env' });

// Cross-Origin Resource Sharing 허용
const cors = require('cors');
app.use(cors());

// request body json으로 파싱 설정
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// json 파싱 기본용량이 100kb임. 늘려줌
app.use(express.json({
  limit : "50mb"
}));
// app.use(express.urlencoded({
//   limit:"10mb",
//   extended: false
// }));

app.set('port', process.env.PORT);    // 같은 경로에 config.env 파일 생성 후 PORT 지정. (3001)

const weatherRouter = require("./router/weather");

app.get('/', (req, res) => {
  res.json('Hello, Express');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

app.use("/weather", weatherRouter);