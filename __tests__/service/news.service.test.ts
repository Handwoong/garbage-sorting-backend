import { News } from "@src/db";
import { INews } from "@src/models/interface";
import { NewsService } from "@src/service/news.service";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_400_BADREQUEST, STATUS_404_NOTFOUND } from "@src/utils/statusCode";

const tempNews: INews = { url: "http://test.com", title: "테스트기사" };

describe("NEWS SERVICE LOGIC", () => {
    it("NEWS 목록을 반환한다.", async () => {
        News.find = jest.fn().mockResolvedValue([tempNews]);
        const newsList = await NewsService.getNewsList({});
        expect(newsList).toHaveLength(1);
        expect(newsList[0].url).toEqual("http://test.com");
        expect(newsList[0].title).toEqual("테스트기사");
    });

    it("NEWS를 생성한다.", async () => {
        const createdNews = await NewsService.addNews(tempNews);
        expect(createdNews.url).toEqual("http://test.com");
        expect(createdNews.title).toEqual("테스트기사");
    });

    it("NEWS를 수정한다.", async () => {
        const spyFn = jest.spyOn(News, "update");
        const newNews = await NewsService.addNews(tempNews);
        const updatedNews = await NewsService.updateNews(newNews._id.toString(), {
            url: "http://testing",
            title: "테스트중",
        });
        expect(spyFn).toBeCalledTimes(1);
        expect(updatedNews?.url).toEqual("http://testing");
        expect(updatedNews?.title).toEqual("테스트중");
    });

    it("NEWS를 삭제한다.", async () => {
        const spyFn = jest.spyOn(News, "delete");
        const targetNews = await NewsService.addNews(tempNews);
        const deleteResult = await NewsService.deleteNews(targetNews._id.toString());
        expect(spyFn).toBeCalledTimes(1);
        expect(deleteResult.message).toBe("삭제가 완료되었습니다.");
    });
});

describe("NEWS SERVICE ERROR HANDLING", () => {
    it("NEWS 목록이 null이나 undefined라면 에러를 발생시킨다.", async () => {
        News.find = jest.fn().mockResolvedValue(null);
        try {
            await NewsService.getNewsList({});
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_404_NOTFOUND);
            expect(err.message).toBe("뉴스 목록을 가져올 수 없습니다.");
        }
    });

    it("NEWS 생성 시 생성된 뉴스가 없으면 에러가 발생한다.", async () => {
        News.create = jest.fn().mockResolvedValue(null);
        try {
            await NewsService.addNews(tempNews);
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("뉴스 생성에 실패하였습니다.");
        }
    });

    it("NEWS 수정 시 뉴스를 찾을 수 없으면 에러가 발생한다.", async () => {
        News.update = jest.fn().mockResolvedValue(null);
        try {
            await NewsService.updateNews("id", tempNews);
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("해당 뉴스를 찾을 수 없습니다.");
        }
    });

    it("NEWS 삭제 시 뉴스를 찾을 수 없으면 에러가 발생한다.", async () => {
        News.delete = jest.fn().mockResolvedValue(null);
        try {
            await NewsService.deleteNews("id");
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("해당 뉴스를 찾을 수 없습니다.");
        }
    });
});
