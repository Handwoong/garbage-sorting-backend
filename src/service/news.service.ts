import { News } from "@src/db";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_503_SERVICEUNAVAILABLE } from "@src/utils/statusCode";

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
}
