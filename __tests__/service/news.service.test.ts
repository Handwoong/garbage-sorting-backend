import { News } from "@src/db";
import { newsService } from "@src/service/news.service";
import { RequestError } from "@src/middlewares/errorHandler";

describe("NEWS SERVICE LOGIC", () => {
    it("NEWS 목록 반환을 반환한다.", async () => {
        const news = await newsService.getNewsList();
        expect(news.length).toBe(10);
    });

    it("NEWS 목록이 null이나 undefined라면 에러를 발생시킨다.", async () => {
        News.findAllNews = jest.fn().mockResolvedValue(null);
        try {
            await newsService.getNewsList();
        } catch (e: any) {
            expect(e).toBeInstanceOf(RequestError);
            expect(e.message).toBe("뉴스 목록을 가져올 수 없습니다.");
        }
    });
});
