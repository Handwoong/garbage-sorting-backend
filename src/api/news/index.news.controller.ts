import { STATUS_200_OK } from "@src/utils/statusCode";
import { Router } from "express";

const newsController = Router();

newsController.get("/news/", (req, res, next) => {
    res.status(STATUS_200_OK).json({ message: "NEWS" });
});

export default newsController;
