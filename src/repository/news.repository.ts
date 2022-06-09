import { NewsModel } from "@src/db/news/news.schema";

export class News {
    static async getNewsList() {
        return await NewsModel.find();
    }
}
