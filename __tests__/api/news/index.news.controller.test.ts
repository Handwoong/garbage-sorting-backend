import app from "@src/app";
import request from "supertest";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";

describe("NEWS API", () => {
    it("NEWS GET/ 뉴스목록을 응답받는다.", async () => {
        const res = await request(app).get("/news");
        expect(res.status).toBe(STATUS_200_OK);
    });

    it("NEWS POST/ 뉴스를 생성한다.", async () => {
        const news = { url: "주소", title: "제목" };
        const res = await request(app).post("/news").send(news);
        expect(res.status).toBe(STATUS_201_CREATED);
        expect(res.body.url).toEqual("주소");
        expect(res.body.title).toEqual("제목");
    });
});
