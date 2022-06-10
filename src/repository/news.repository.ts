import { NewsModel } from "@src/db/news/news.schema";
import { INews } from "@src/utils/types/news.interface";

export class News {
    static async findAllNews() {
        return await NewsModel.find();
    }

    static async createNews(news: INews) {
        const createdNews = await NewsModel.create(news);
        return createdNews;
    }

    static async setNews(id: string, news: INews) {
        const setNews = await NewsModel.findByIdAndUpdate(id, { $set: news }, { new: true });
        return setNews;
    }
}
