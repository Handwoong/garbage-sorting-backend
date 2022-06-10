import { Router } from "express";
import wrapAsyncFunc from "@src/utils/catchAsync";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";
import { newsService } from "@src/service/news.service";
import { INews } from "@src/utils/types/news.interface";

const newsController = Router();

newsController.get(
    "/news",
    wrapAsyncFunc(async (_req, res, _next) => {
        const newsList = await newsService.getNewsList();
        res.status(STATUS_200_OK).json(newsList);
    }),
);

newsController.post(
    "/news",
    wrapAsyncFunc(async (req, res, _next) => {
        const { url, title }: INews = req.body;
        const createdNews = await newsService.addNews({ url, title });
        res.status(STATUS_201_CREATED).json(createdNews);
    }),
);

newsController.patch(
    "/news/:id",
    wrapAsyncFunc(async (req, res, _next) => {
        const { id } = req.params;
        const news: INews = req.body;
        const updatedNews = await newsService.updateNews(id, news);
        res.status(STATUS_200_OK).json(updatedNews);
    }),
);

export default newsController;
