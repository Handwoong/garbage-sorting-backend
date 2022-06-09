import { Express } from "express";
import newsController from "@src/api/news/index.news.controller";

export const indexController = (app: Express) => {
    app.use(newsController);
};
