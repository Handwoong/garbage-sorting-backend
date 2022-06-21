import jwt from "jsonwebtoken";
import { createAccessToken, createRefreshToken, verifyToken } from "@src/utils/jwt";
jest.mock("jsonwebtoken", () => ({
    sign: jest.fn(() => "success"),
    verify: jest.fn(() => "success"),
}));

describe("JWT TOKEN", () => {
    it("accessToken을 생성한다.", () => {
        createAccessToken("test");
        expect(jwt.sign).toHaveBeenCalled();
    });

    it("refreshToken을 생성한다.", () => {
        createRefreshToken();
        expect(jwt.sign).toHaveBeenCalled();
    });

    it("토큰이 비정상적이면 검증에서 에러가 발생한다.", () => {
        jwt.verify = jest.fn().mockImplementation(() => {
            throw new Error("에러발생!");
        });
        try {
            verifyToken("test");
            expect(jwt.verify).toHaveBeenCalled();
        } catch (err: any) {
            expect(err.message).toEqual("asdf");
        }
    });
});
