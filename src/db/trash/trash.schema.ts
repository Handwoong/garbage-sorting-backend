import { Schema, model } from "mongoose";
import { ITrash } from "@src/models/interface";
import { TRASH_CATEGORY } from "@src/utils/constans";

const TrashSchema = new Schema<ITrash>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            _id: false,
            type: {
                throwAway: { type: [String], required: true },
                note: { type: [String], required: true },
            },
            required: true,
            default: { throwAway: [], note: [] },
        },
        kind: {
            type: [String],
            required: true,
            default: [],
        },
        image: {
            type: String,
            required: true,
            default:
                "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        },
        recycle: {
            type: Boolean,
            required: true,
            default: false,
        },
        category: {
            type: [String],
            required: true,
            enum: TRASH_CATEGORY,
        },
    },
    {
        collection: "trash",
    },
);

export const TrashModel = model<ITrash>("Trash", TrashSchema);
