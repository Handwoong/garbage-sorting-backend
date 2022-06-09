import { News } from "@src/db";

describe("NEWS 모델 접근", () => {
    it("getNewsList는 뉴스 목록을 반환한다.", async () => {
        const news = await News.findAllNews();
        expect(news.length).toBe(10);
    });
});
