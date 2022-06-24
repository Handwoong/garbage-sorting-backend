import { Schema, model } from "mongoose";
import { IComment } from "@src/models/interface";

const CommentSchema = new Schema<IComment>(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export const CommentModel = model<IComment>("Comment", CommentSchema);
