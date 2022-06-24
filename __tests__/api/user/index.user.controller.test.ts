import app from "@src/app";
import bcrypt from "bcrypt";
import request from "supertest";
import { IUser } from "@src/models/interface";
import { createAccessToken, createRefreshToken } from "@src/utils/jwt";
import { UserService } from "@src/service/user.service";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";

describe("USER API", () => {
    const tempUser: IUser = {
        email: "test@test.com",
        username: "테스트유저",
        password: "testtest",
    };

    it("현재 USER의 상태를 조회한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const accessToken = createAccessToken(createdUser._id);
        const refreshToken = createRefreshToken();
        const res = await request(app)
            .get("/users/current")
            .set("Cookie", [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`]);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body.email).toEqual("test@test.com");
        expect(res.body.username).toEqual("테스트유저");
        expect(res.body.password).toBeUndefined();
    });

    it("한명의 USER를 조회한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const res = await request(app).get(`/users/${createdUser._id}`);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body.email).toEqual("test@test.com");
        expect(res.body.username).toEqual("테스트유저");
        expect(res.body.password).toBeUndefined();
    });

    it("USER 점수에 따른 랭킹을 조회한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const res = await request(app).get(`/users/rank`);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body[0].email).toEqual(createdUser.email);
        expect(res.body[0].username).toEqual(createdUser.username);
    });

    it("USER REGISTER 유저를 생성한다.", async () => {
        const res = await request(app).post("/users/register").send(tempUser);
        expect(res.status).toBe(STATUS_201_CREATED);
        expect(res.body).toHaveProperty("email");
        expect(res.body).toHaveProperty("username");
    });

    it("USER LOGIN 유저가 로그인한다.", async () => {
        bcrypt.compare = jest.fn().mockResolvedValue(true);
        await UserService.addUser(tempUser);
        const res = await request(app)
            .post("/users/login")
            .send({ email: "test@test.com", password: "testtest" });
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body).toHaveProperty("email");
        expect(res.body).toHaveProperty("username");
    });

    it("USER LOGOUT 유저가 로그아웃한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const accessToken = createAccessToken(createdUser._id);
        const refreshToken = createRefreshToken();
        const res = await request(app)
            .get("/users/logout")
            .set("Cookie", [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`]);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body.message).toEqual("정상적으로 로그아웃이 완료되었습니다.");
    });

    it("USER PUT 유저 정보를 수정한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const accessToken = createAccessToken(createdUser._id);
        const refreshToken = createRefreshToken();
        const res = await request(app)
            .put("/users/update")
            .set("Cookie", [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`])
            .send({ email: createdUser.email, username: "updateName", password: "updatePassword" });
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body.username).toEqual("updateName");
    });

    it("USER SCORE PUT/ 유저 미니게임 점수를 갱신한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const accessToken = createAccessToken(createdUser._id);
        const refreshToken = createRefreshToken();
        const res = await request(app)
            .put("/users/score")
            .set("Cookie", [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`])
            .send({ score: 80 });
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body.message).toEqual("점수 갱신이 완료되었습니다.");
    });

    it("USER DELETE 유저를 삭제한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const accessToken = createAccessToken(createdUser._id);
        const refreshToken = createRefreshToken();
        const res = await request(app)
            .delete("/users/delete")
            .set("Cookie", [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`]);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body.message).toEqual("삭제가 완료되었습니다.");
    });
});
