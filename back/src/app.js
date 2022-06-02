import cors from "cors";
import express from "express";
import {errorMiddleware}  from "./middlewares/errorMiddleware.js";
const app = express();

// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json({
    limit: "5mb"
}));
  app.use(express.urlencoded({ 
    limit: "5mb",
    extended: false 
}));

// 기본 페이지
app.get("/", (req, res) => {
    res.send("안녕하세요, AI프로젝트 3팀 서버입니다.");
});
app.use(errorMiddleware);
export { app };