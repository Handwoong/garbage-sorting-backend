import { News } from "@src/db";
import { NewsModel } from "@src/db/news/news.schema";
import { INews } from "@src/utils/types/news.interface";

describe("NEWS 모델 접근", () => {
    it("findAllNews는 모델에서 뉴스목록을 찾는다.", async () => {
        const spyFn = jest.spyOn(NewsModel, "find");
        await News.findAllNews();
        expect(spyFn).toBeCalledTimes(1);
    });

    it("createNews는 뉴스를 생성한다.", async () => {
        const tempNews: INews = { url: "repositoryURL", title: "repositoryTitle" };
        const createdNews = await News.createNews(tempNews);
        expect(createdNews.url).toEqual("repositoryURL");
        expect(createdNews.title).toEqual("repositoryTitle");
    });
});
