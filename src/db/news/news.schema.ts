import { Schema, model } from "mongoose";
import { INews } from "@src/utils/types/news.interface";

const NewsSchema = new Schema<INews>({
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});

export const NewsModel = model<INews>("News", NewsSchema);
