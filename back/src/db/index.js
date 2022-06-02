import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User";

dotenv.config();
const MONGODB_URI =
  process.env.MONGODB_URI || "MONGODB_URI가 설정되지 않았습니다..";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("정상적으로 MongoDB 서버에 연결되었습니다.");
  })
  .catch((error) => {
    console.error("MongoDB 연결에 실패하였습니다..." + "\n" + error);
  });

export { User };
