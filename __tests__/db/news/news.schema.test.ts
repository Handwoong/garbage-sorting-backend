import { NewsModel } from "@src/db/news/news.schema";

describe("NewsModel 유효성 검사", () => {
    it("url과 title은 필수로 입력해야한다.", () => {
        const news = new NewsModel();
        const error = news.validateSync();
        expect(error?.errors["title"].message).toEqual("Path `title` is required.");
        expect(error?.errors["url"].message).toEqual("Path `url` is required.");
    });

    it("url만 입력하면 안된다.", () => {
        const news = new NewsModel({ url: "링크" });
        const error = news.validateSync();
        expect(error?.errors["title"].message).toEqual("Path `title` is required.");
    });

    it("title만 입력하면 안된다.", () => {
        const news = new NewsModel({ title: "타이틀" });
        const error = news.validateSync();
        expect(error?.errors["url"].message).toEqual("Path `url` is required.");
    });

    it("url은 문자열 타입이어야 한다.", () => {
        const news = new NewsModel({ url: ["url"], title: "타이틀" });
        const error = news.validateSync();
        expect(error?.errors["url"].message).toMatch(/Cast to string failed/);
    });

    it("title은 문자열 타입이어야 한다.", () => {
        const news = new NewsModel({ url: "링크", title: ["타이틀"] });
        const error = news.validateSync();
        expect(error?.errors["title"].message).toMatch(/Cast to string failed/);
    });

    it("url과 title이 둘다 문자열이면 오류 메시지가 없어야한다.", () => {
        const news = new NewsModel({ url: "링크", title: "타이틀" });
        const error = news.validateSync();
        expect(error?.errors["title"]).toBeUndefined();
        expect(error?.errors["url"]).toBeUndefined();
    });
});
