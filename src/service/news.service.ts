import { News } from "@src/db";
import { INews } from "@src/utils/types/interface";
import { STATUS_404_NOTFOUND } from "@src/utils/statusCode";
import { RequestError } from "@src/middlewares/errorHandler";

export class newsService {
    static async getNewsList() {
        const foundNewsList = await News.findAll();
        if (!foundNewsList)
            throw new RequestError("뉴스 목록을 가져올 수 없습니다.", STATUS_404_NOTFOUND);
        return foundNewsList;
    }

    static async addNews(newsInfo: INews) {
        const createdNews = await News.create(newsInfo);
        if (!createdNews)
            throw new RequestError("뉴스 생성에 실패하였습니다.", STATUS_404_NOTFOUND);
        return createdNews;
    }

    static async updateNews(id: string, newsInfo: INews) {
        const updatedNews = await News.update(id, newsInfo);
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
