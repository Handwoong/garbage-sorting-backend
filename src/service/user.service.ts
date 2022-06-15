import bcrypt from "bcrypt";
import { User } from "@src/db";
import { IUser } from "@src/models/interface";
import { RequestError } from "@src/middlewares/errorHandler";
import { createToken } from "@src/utils/jwt";
import { Document } from "mongoose";

const deletePassword = (mongooseObj: Document) => {
    const obj = mongooseObj.toObject();
    delete obj.password;
    return obj;
};

export class UserService {
    static async addUser(userInfo: IUser) {
        const { email } = userInfo;
        const foundEmail = await User.findByEmail(email);
        if (foundEmail) throw new RequestError("이미 사용중인 이메일입니다.");

        const newUser = User.create(userInfo);
        await newUser.save();
        return deletePassword(newUser);
    }

    static async login(userInfo: IUser) {
        const { email, password: targetPassword } = userInfo;
        const foundUser = await User.findByEmail(email);
        if (!(foundUser?.password && targetPassword)) {
            throw new RequestError("이메일 또는 비밀번호를 확인해주세요.");
        }
        const isCheckedPassword = await bcrypt.compare(targetPassword, foundUser.password);
        if (!isCheckedPassword) throw new RequestError("이메일 또는 비밀번호를 확인해주세요.");

        const { accessToken, refreshToken } = createToken(foundUser._id.toString());
        const updatedUser = await User.update(foundUser._id.toString(), { token: refreshToken });
        const user = deletePassword(updatedUser as Document);
        return { user, accessToken, refreshToken };
    }
}
