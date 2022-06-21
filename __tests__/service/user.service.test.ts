import { IUser } from "@src/models/interface";
import { User } from "@src/repository/user.repository";
import { UserService } from "@src/service/user.service";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_400_BADREQUEST } from "@src/utils/statusCode";
import bcrypt from "bcrypt";

const tempUser: IUser = {
    email: "test@test.com",
    username: "테스트유저",
    password: "test",
};

describe("USER SERVICE LOGIC", () => {
    it("USER를 생성한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        expect(createdUser.email).toEqual("test@test.com");
        expect(createdUser.username).toEqual("테스트유저");
    });

    it("USER를 조회한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const foundUser = await UserService.getByUser(createdUser._id.toString());
        expect(foundUser.password).toBeUndefined();
        expect(foundUser.email).toEqual("test@test.com");
        expect(foundUser.username).toEqual("테스트유저");
    });

    it("USER 정보를 수정한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const updatedUser = await UserService.updateUser(createdUser._id.toString(), {
            username: "수정된이름",
            password: "수정된비밀번호",
        });
        expect(updatedUser.password).toBeUndefined();
        expect(updatedUser.username).toEqual("수정된이름");
    });

    it("USER를 삭제한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const deletedUser = await UserService.deleteUser(createdUser._id.toString());
        expect(deletedUser.message).toEqual("삭제가 완료되었습니다.");
    });

    it("USER 로그인에 성공하면 유저와 토큰을 발급한다.", async () => {
        bcrypt.compare = jest.fn().mockResolvedValue(true);
        await UserService.addUser(tempUser);
        const loginedUser = await UserService.login({ email: "test@test.com", password: "test" });

        expect(loginedUser).toHaveProperty("user");
        expect(loginedUser).toHaveProperty("accessToken");
        expect(loginedUser).toHaveProperty("refreshToken");
    });
});

describe("USER SERVICE ERROR HANDLING", () => {
    it("회원가입 시 이미 존재하는 이메일이 있으면 에러가 발생한다.", async () => {
        User.findByEmail = jest.fn().mockResolvedValue(tempUser);
        try {
            await UserService.addUser(tempUser);
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("이미 사용중인 이메일입니다.");
        }
    });

    it("USER 조회 시 찾은 사용자가 없으면 에러가 발생한다.", async () => {
        User.findById = jest.fn().mockResolvedValue(null);
        try {
            await UserService.getByUser("testId");
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("해당 사용자를 찾을 수 없습니다.");
        }
    });

    it("USER 정보 수정 시 사용자를 못찾으면 에러가 발생한다.", async () => {
        User.update = jest.fn().mockResolvedValue(null);
        try {
            await UserService.updateUser("id", {
                username: "수정된유저",
                password: "수정된비밀번호",
            });
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("해당 사용자를 찾을 수 없습니다.");
        }
    });

    it("USER를 삭제 시 사용자를 못찾으면 에러가 발생한다.", async () => {
        User.delete = jest.fn().mockResolvedValue(null);
        try {
            await UserService.deleteUser("id");
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("해당 사용자를 찾을 수 없습니다.");
        }
    });

    it("UsER 로그인 시 비밀번호가 비어있거나 찾은 비밀번호가 없다면 에러가 발생한다.", async () => {
        User.findByEmail = jest.fn().mockResolvedValue(null);
        try {
            await UserService.login({ email: "test@test.com", password: "test" });
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("이메일 또는 비밀번호를 확인해주세요.");
        }
    });

    it("USER 로그인 시 bcrypt compare가 false라면 에러가 발생한다.", async () => {
        User.findByEmail = jest.fn().mockResolvedValue(tempUser);
        bcrypt.compare = jest.fn().mockResolvedValue(false);
        try {
            await UserService.login({ email: "test@test.com", password: "notsame" });
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("이메일 또는 비밀번호를 확인해주세요.");
        }
    });

    it("USER 로그아웃 시 사용자를 찾을 수 없으면 에러가 발생한다.", async () => {
        User.removeToken = jest.fn().mockResolvedValue(null);
        try {
            await UserService.logout("testId");
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("해당 사용자를 찾을 수 없습니다.");
        }
    });
});
