import { Schema, model } from "mongoose";
import { ITrash } from "@src/models/interface";
import { TRASH_CATEGORY } from "@src/utils/constants";

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
