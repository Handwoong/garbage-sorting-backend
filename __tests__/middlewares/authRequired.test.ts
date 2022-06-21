import { authRequired } from "@src/middlewares/authRequired";
import { mockNext, mockRequest, mockResponse } from "@src/utils/setUpTests";
import { STATUS_401_UNAUTHORIZED } from "@src/utils/statusCode";
import { UserService } from "@src/service/user.service";
jest.mock("@src/utils/jwt", () => ({
    verifyToken: (token: any) => token,
    createAccessToken: (token: any) => token,
    createRefreshToken: () => "test",
}));

const res = mockResponse();
const next = mockNext();

describe("AUTH MIDDLEWARE", () => {
    it("accessToken이 없으면 에러가 발생한다.", () => {
        const req = mockRequest({}, {}, {});
        try {
            authRequired(req, res, next);
        } catch (err: any) {
            expect(err.status).toBe(STATUS_401_UNAUTHORIZED);
            expect(err.message).toEqual("로그인이 필요한 서비스입니다.");
        }
    });

    it("accessToken 및 refreshToken이 둘 다 유효하다.", () => {
        const req = mockRequest({}, {}, { accessToken: "test", refreshToken: "test" });
        authRequired(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(req.cookies).toHaveProperty("currentUserId");
    });

    it("accessToken 및 refreshToken이 둘 다 만료되면 에러가 발생한다.", () => {
        const accessToken = new Error("jwt expired");
        const refreshToken = new Error("jwt expired");
        const req = mockRequest({}, {}, { accessToken, refreshToken });
        try {
            authRequired(req, res, next);
        } catch (err: any) {
            expect(err.status).toBe(STATUS_401_UNAUTHORIZED);
            expect(err.message).toEqual("로그인이 필요한 서비스입니다.");
        }
    });

    it("accessToken은 만료되었지만 refreshToken은 유효하다면 토큰을 새로 발급한다.", () => {
        const accessToken = new Error("jwt expired");
        const req = mockRequest({}, {}, { accessToken, refreshToken: "test" });
        authRequired(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(req.cookies).toHaveProperty("currentUserId");
    });

    it("accessToken은 유요하지만 refreshToken은 만료되면 refreshToken을 새로 발급한다.", () => {
        const refreshToken = new Error("jwt expired");
        const req = mockRequest({}, {}, { accessToken: { userId: "testId" }, refreshToken });
        UserService.updateUser = jest.fn().mockResolvedValue(next());
        try {
            authRequired(req, res, next);
            expect(UserService.updateUser).toHaveBeenCalled();
        } catch (err: any) {
            expect(err.status).toBe(STATUS_401_UNAUTHORIZED);
            expect(err.message).toEqual("인증에 실패하였습니다.");
        }
    });

    it("refreshToken 자체가 없다면 인증 실패 에러가 발생한다.", () => {
        const req = mockRequest({}, {}, { accessToken: { userId: "testId" } });
        try {
            authRequired(req, res, next);
        } catch (err: any) {
            expect(err.status).toBe(STATUS_401_UNAUTHORIZED);
            expect(err.message).toEqual("로그인이 필요한 서비스입니다.");
        }
    });
});
