import { Schema, model } from "mongoose";
import { IUser } from "@src/models/interface";

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    topscore: {
        type: Number,
        default: 0,
    },
    token: {
        type: String,
    },
});

export const UserModel = model<IUser>("User", UserSchema);
