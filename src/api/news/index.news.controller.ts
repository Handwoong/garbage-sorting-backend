import { Router } from "express";
import wrapAsyncFunc from "@src/utils/catchAsync";
import { STATUS_200_OK } from "@src/utils/statusCode";
import { newsService } from "@src/service/news.service";

const newsController = Router();

newsController.get(
    "/news",
    wrapAsyncFunc(async (_req, res, _next) => {
        const newsList = await newsService.getNewsList();
        res.status(STATUS_200_OK).json(newsList);
    }),
);

export default newsController;
