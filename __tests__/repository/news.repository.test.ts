import { News } from "@src/db";
import { NewsModel } from "@src/db/news/news.schema";

describe("NEWS 모델 접근", () => {
    it("findAll은 모델에서 뉴스목록을 찾는다.", async () => {
        const spyFn = jest.spyOn(NewsModel, "find");
        await News.findAll();
        expect(spyFn).toBeCalledTimes(1);
    });

    it("create는 뉴스를 생성한다.", async () => {
        const createdNews = await News.create({ url: "repositoryURL", title: "repositoryTitle" });
        expect(createdNews.url).toEqual("repositoryURL");
        expect(createdNews.title).toEqual("repositoryTitle");
    });

    it("update는 뉴스를 수정한다.", async () => {
        const news = await News.create({ url: "수정 전 url", title: "수정 전 title" });
        const setNews = await News.update(news._id.toString(), {
            url: "수정 후 url",
            title: "수정 후 title",
        });
        expect(setNews?.url).toEqual("수정 후 url");
        expect(setNews?.title).toEqual("수정 후 title");
    });

    it("delete는 뉴스를 삭제한다.", async () => {
        const news = await News.create({ url: "삭제url", title: "삭제title" });
        const deletedNews = await News.delete(news._id.toString());
        expect(deletedNews?.url).toEqual("삭제url");
        expect(deletedNews?.title).toEqual("삭제title");
    });
});
