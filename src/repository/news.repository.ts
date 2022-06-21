import { NewsModel } from "@src/db/news/news.schema";
import { INews, MongooseQuery } from "@src/models/interface";

export class News {
    static async find({ filteredQuery, limit }: { filteredQuery: MongooseQuery; limit: number }) {
        return NewsModel.find(filteredQuery).sort({ _id: 1 }).limit(limit);
    }

    static async create(newsInfo: INews) {
        return NewsModel.create(newsInfo);
    }

    static async update(id: string, newsInfo: INews) {
        return NewsModel.findByIdAndUpdate(id, { $set: newsInfo }, { new: true });
    }

    static async delete(id: string) {
        return NewsModel.findByIdAndDelete(id);
    }
}
