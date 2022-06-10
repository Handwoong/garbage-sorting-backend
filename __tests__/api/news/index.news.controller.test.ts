import app from "@src/app";
import request from "supertest";
import { newsService } from "@src/service/news.service";
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

    it("NEWS PATCH/ 뉴스를 수정한다.", async () => {
        const beforeNews = { url: "수정 전 url", title: "수정 전 title" };
        const news = await newsService.addNews(beforeNews);
        const afterNews = { url: "수정 후 url" };
        const res = await request(app).patch(`/news/${news._id}`).send(afterNews);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body.url).toEqual("수정 후 url");
        expect(res.body.title).toEqual("수정 전 title");
        expect(res.body._id === news._id.toString()).toBe(true);
    });
});
