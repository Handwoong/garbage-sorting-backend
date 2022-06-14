import Joi from "joi";
import { TRASH_CATEGORY } from "@src/utils/constans";

export const newsSchema = Joi.object({
    url: Joi.string().required(),
    title: Joi.string().required(),
});

export const trashSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.object({
        throwAway: Joi.array().items(Joi.string()).required(),
        note: Joi.array().items(Joi.string()).required(),
    }),
    kind: Joi.array().items(Joi.string()).required(),
    image: Joi.string().required(),
    recycle: Joi.boolean().required(),
    category: Joi.array()
        .items(Joi.string().valid(...TRASH_CATEGORY))
        .required(),
});

export const quizSchema = Joi.object({
    answer: Joi.string().required(),
});

export const quizSetSchema = Joi.object({
    type: Joi.string().required(),
    answers: Joi.array().items({ quizId: Joi.string(), answer: Joi.string() }).required(),
});
