import mongoose from "mongoose";
import "dotenv/config";
import { User } from "@src/repository/user.repository";
import { News } from "@src/repository/news.repository";
import { Quiz } from "@src/repository/quiz.repository";
import { Trash } from "@src/repository/trash.repository";
import { Bins } from "@src/repository/bins.repository";

const DB_URL =
    process.env.MONGODB_URL ||
    "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

if (process.env.NODE_ENV !== "test") {
    mongoose.connect(DB_URL);
    const db = mongoose.connection;

    db.on("connected", () => console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL));
    db.on("error", (error) =>
        console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error),
    );
}

export { User, Quiz, Trash, News };
