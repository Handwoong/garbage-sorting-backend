import { ObjectSchema } from "joi";
import { RequestHandler } from "express";
import { RequestError } from "@src/middlewares/errorHandler";

export const bodyValidator =
    (schema: ObjectSchema): RequestHandler =>
    (req, res, next) => {
        const { error } = schema.validate(req.body, { allowUnknown: true });
        if (error) {
            const { status, message } = new RequestError("요청 데이터 형식이 옳바르지 않습니다.");
            return res.status(status).json({ message });
        }
        return next();
    };

export const paramsValidator =
    (schema: ObjectSchema): RequestHandler =>
    (req, res, next) => {
        const { error } = schema.validate(req.params);
        if (error) {
            const { status, message } = new RequestError("요청 데이터 형식이 옳바르지 않습니다.");
            return res.status(status).json({ message });
        }
        return next();
    };

export const queryStringValidator =
    (schema: ObjectSchema): RequestHandler =>
    (req, res, next) => {
        const { error } = schema.validate(req.query);
        if (error) {
            const { status, message } = new RequestError("요청 데이터 형식이 옳바르지 않습니다.");
            return res.status(status).json({ message });
        }
        return next();
    };
