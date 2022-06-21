import { News } from "@src/db";
import { createFilterQuery } from "@src/utils/createQuery";
import { STATUS_404_NOTFOUND } from "@src/utils/statusCode";
import { RequestError } from "@src/middlewares/errorHandler";
import { FilterQuery, INews } from "@src/models/interface";

export class NewsService {
    static async getNewsList(query: FilterQuery) {
        const filterList = ["title"];
        const { filteredQuery, limit } = createFilterQuery(query, filterList);
        const foundNewsList = await News.find({ filteredQuery, limit });
        if (!foundNewsList)
            throw new RequestError("뉴스 목록을 가져올 수 없습니다.", STATUS_404_NOTFOUND);
        return foundNewsList;
    }

    static async addNews(newsInfo: INews) {
        const createdNews = await News.create(newsInfo);
        if (!createdNews) throw new RequestError("뉴스 생성에 실패하였습니다.");
        return createdNews;
    }

    static async updateNews(id: string, newsInfo: INews) {
        const updatedNews = await News.update(id, newsInfo);
        if (!updatedNews) throw new RequestError("해당 뉴스를 찾을 수 없습니다.");
        return updatedNews;
    }

    static async deleteNews(id: string) {
        const deletedNews = await News.delete(id);
        if (!deletedNews) throw new RequestError("해당 뉴스를 찾을 수 없습니다.");
        return { message: "삭제가 완료되었습니다." };
    }
}
