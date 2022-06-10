import { News } from "@src/db";
import { newsService } from "@src/service/news.service";
import { RequestError } from "@src/middlewares/errorHandler";
import { INews } from "@src/utils/types/news.interface";

describe("NEWS SERVICE LOGIC", () => {
    it("NEWS 목록 반환을 반환한다.", async () => {
        News.findAllNews = jest
            .fn()
            .mockResolvedValue([{ url: "http://test.com", title: "테스트기사" }]);
        const news = await newsService.getNewsList();
        expect(news.length).toBe(1);
        expect(news[0].url).toEqual("http://test.com");
        expect(news[0].title).toEqual("테스트기사");
    });

    it("NEWS 목록이 null이나 undefined라면 에러를 발생시킨다.", async () => {
        News.findAllNews = jest.fn().mockResolvedValue(null);
        try {
            await newsService.getNewsList();
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.message).toBe("뉴스 목록을 가져올 수 없습니다.");
        }
    });

    it("NEWS를 생성한다.", async () => {
        const tempNews: INews = { url: "serviceURL", title: "serviceTitle" };
        const createdNews = await newsService.addNews(tempNews);
        expect(createdNews.url).toEqual("serviceURL");
        expect(createdNews.title).toEqual("serviceTitle");
    });
});
