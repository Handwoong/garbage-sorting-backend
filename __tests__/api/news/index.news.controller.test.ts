import app from "@src/app";
import request from "supertest";
import { INews } from "@src/models/interface";
import { NewsService } from "@src/service/news.service";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";

describe("NEWS API", () => {
    const tempNews: INews = { url: "https://team10", title: "분리수ZIP" };

    it("NEWS GET/ 뉴스목록을 응답받는다.", async () => {
        const res = await request(app).get("/news");
        expect(res.status).toBe(STATUS_200_OK);
    });

    it("NEWS POST/ 뉴스를 생성한다.", async () => {
        const res = await request(app).post("/news").send(tempNews);
        expect(res.status).toBe(STATUS_201_CREATED);
        expect(res.body.url).toEqual("https://team10");
        expect(res.body.title).toEqual("분리수ZIP");
    });

    it("NEWS PUT/ 뉴스를 수정한다.", async () => {
        const news = await NewsService.addNews(tempNews);
        const res = await request(app)
            .put(`/news/${news._id}`)
            .send({ ...tempNews, url: "https://elice-team10" });
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body.title).toEqual("분리수ZIP");
        expect(res.body.url).toEqual("https://elice-team10");
        expect(res.body._id === news._id.toString()).toBe(true);
    });

    it("NEWS DELETE/ 뉴스를 삭제한다.", async () => {
        const targetNews = await NewsService.addNews(tempNews);
        const res = await request(app).delete(`/news/${targetNews._id}`);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body.message).toEqual("삭제가 완료되었습니다.");
    });
});
