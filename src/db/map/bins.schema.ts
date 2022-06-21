import { Schema, model } from "mongoose";
import { IBins } from "@src/models/interface";

const binsSchema = new Schema<IBins>(
    {
        region: {
            type: String,
            required: true,
        },
        roads: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
        points: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        type: {
            type: [String],
            required: true,
        },
        x: {
            type: String,
            required: true,
        },
        y: {
            type: String,
            required: true,
        },
    },
    {
        collection: "bins",
    },
);

export const BinsModel = model<IBins>("Bins", binsSchema);
