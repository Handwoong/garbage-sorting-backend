import { News } from "@src/db";
import { INews } from "@src/utils/types/news.interface";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_404_NOTFOUND, STATUS_503_SERVICEUNAVAILABLE } from "@src/utils/statusCode";

export class newsService {
    static async getNewsList() {
        const newsList = await News.findAllNews();
        if (!newsList)
            throw new RequestError(
                "뉴스 목록을 가져올 수 없습니다.",
                STATUS_503_SERVICEUNAVAILABLE,
            );
        return newsList;
    }

    static async addNews(news: INews) {
        const newNews = await News.createNews(news);
        return newNews;
    }

    static async updateNews(id: string, news: INews) {
        const updateNews = await News.setNews(id, news);
        if (!updateNews)
            throw new RequestError("해당 뉴스가 존재하지 않습니다.", STATUS_404_NOTFOUND);
        return updateNews;
    }
}
