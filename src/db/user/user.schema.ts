import { Schema, model } from "mongoose";
import { IUser } from "@src/models/interface";

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
});

export const UserModel = model<IUser>("User", UserSchema);
