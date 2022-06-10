import { News } from "@src/db";
import { INews } from "@src/utils/types/news.interface";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_404_NOTFOUND, STATUS_503_SERVICEUNAVAILABLE } from "@src/utils/statusCode";

export class newsService {
    static async getNewsList() {
        const foundNewsList = await News.findAll();
        if (!foundNewsList)
            throw new RequestError(
                "뉴스 목록을 가져올 수 없습니다.",
                STATUS_503_SERVICEUNAVAILABLE,
            );
        return foundNewsList;
    }

    static async addNews(news: INews) {
        const createdNews = await News.create(news);
        return createdNews;
    }

    static async updateNews(id: string, news: INews) {
        const updatedNews = await News.update(id, news);
        if (!updatedNews)
            throw new RequestError("해당 뉴스를 찾을 수 없습니다.", STATUS_404_NOTFOUND);
        return updatedNews;
    }

    static async deleteNews(id: string) {
        const deletedNews = await News.delete(id);
        if (!deletedNews)
            throw new RequestError("해당 뉴스를 찾을 수 없습니다.", STATUS_404_NOTFOUND);
        return { message: "삭제가 완료되었습니다." };
    }
}
