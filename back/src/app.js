import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import swaggerDoc from "../swaggerDocs/swaggerDoc";
import { userAuthRouter } from "./routers/userRouter";
import { uploadRouter } from "./routers/uploadRouter";
import { postRouter } from "./routers/postRouter";
import { commentRouter } from "./routers/commentRouter";
import { plantRouter } from "./routers/plantRouter";
import { diaryRouter } from "./routers/diaryRouter";
import { diagRouter } from "./routers/diagRouter";
import { scheduleRouter } from "./routers/scheduleRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

// CORS 에러 방지
app.use(cors());
// app.use(
//   "/swagger",
//   swaggerUi.serve,
//   swaggerUi.setup(specs, { explorer: true })
// );

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(
  express.json({
    limit: "5mb",
  })
);
app.use(
  express.urlencoded({
    limit: "5mb",
    extended: false,
  })
);

app.use(swaggerDoc);
// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, AI프로젝트 3팀 서버입니다.");
});

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use("/users", userAuthRouter);
app.use(uploadRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(plantRouter);
app.use(diaryRouter);
app.use(scheduleRouter);
app.use("/diags", diagRouter);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

export { app };


