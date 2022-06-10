import { NewsModel } from "@src/db/news/news.schema";
import { INews } from "@src/utils/types/news.interface";

export class News {
    static async findAll() {
        return await NewsModel.find();
    }

    static async create(news: INews) {
        const createdNews = await NewsModel.create(news);
        return createdNews;
    }

    static async update(id: string, news: INews) {
        const updatedNews = await NewsModel.findByIdAndUpdate(id, { $set: news }, { new: true });
        return updatedNews;
    }

    static async delete(id: string) {
        const deletedNews = await NewsModel.findByIdAndDelete(id);
        return deletedNews;
    }
}
