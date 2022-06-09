import { NewsModel } from "@src/db/news/news.schema";

export class News {
    static async findAllNews() {
        return await NewsModel.find();
    }
}
