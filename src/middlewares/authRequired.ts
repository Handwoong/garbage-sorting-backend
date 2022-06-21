import { RequestHandler } from "express";
import { UserService } from "@src/service/user.service";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_401_UNAUTHORIZED } from "@src/utils/statusCode";
import { createAccessToken, createRefreshToken, verifyToken } from "@src/utils/jwt";

export const authRequired: RequestHandler = (req, res, next) => {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken || !refreshToken)
        throw new RequestError("로그인이 필요한 서비스입니다.", STATUS_401_UNAUTHORIZED);

    const userToken = verifyToken(accessToken);
    const userRefreshToken = verifyToken(refreshToken);

    if (userToken.message === "jwt expired") {
        if (userRefreshToken.message === "jwt expired") {
            throw new RequestError("로그인이 필요한 서비스입니다.", STATUS_401_UNAUTHORIZED);
        }
        const newAccessToken = createAccessToken(userToken.userId);
        res.cookie("accessToken", newAccessToken);
        req.cookies.accessToken = newAccessToken;
        req.cookies.currentUserId = userToken.userId;
        return next();
    }
    if (userRefreshToken.message === "jwt expired") {
        const newRefreshToken = createRefreshToken();
        UserService.updateUser(userToken.userId, { token: newRefreshToken }).then(() => {
            res.cookie("refreshToken", newRefreshToken);
            req.cookies.refreshToken = newRefreshToken;
            req.cookies.currentUserId = userToken.userId;
            return next();
        });
    }

    if (!(userToken instanceof Error) && !(userRefreshToken instanceof Error)) {
        req.cookies.currentUserId = userToken.userId;
        return next();
    }

    throw new RequestError("인증에 실패하였습니다.", STATUS_401_UNAUTHORIZED);
};
