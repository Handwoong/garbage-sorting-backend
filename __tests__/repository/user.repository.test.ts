import { IUser } from "@src/models/interface";
import { User } from "@src/repository/user.repository";

describe("USER 모델 접근", () => {
    const tempUser: IUser = {
        email: "test@test.com",
        username: "테스트유저",
        password: "test",
    };

    it("findById는 password를 포함시키지 않는다.", async () => {
        const createdUser = await User.create(tempUser);
        const foundUser = await User.findById(createdUser._id.toString());
        expect(foundUser?.password).toBeUndefined();
        expect(foundUser?.email).toEqual("test@test.com");
        expect(foundUser?.username).toEqual("테스트유저");
    });

    it("findByEmail은 email을 가지고 유저를 찾는다.", async () => {
        const createdUser = await User.create(tempUser);
        const foundUser = await User.findByEmail(createdUser.email);
        expect(foundUser).toHaveProperty("password");
        expect(foundUser?.email).toEqual("test@test.com");
        expect(foundUser?.username).toEqual("테스트유저");
    });

    it("create는 유저 인스턴스를 생성한다.", async () => {
        const createdUser = await User.create(tempUser);
        expect(createdUser.email).toEqual("test@test.com");
        expect(createdUser.username).toEqual("테스트유저");
        expect(createdUser.password).toEqual("test");
    });

    it("update는 유저 정보를 수정한다.", async () => {
        const createdUser = await User.create(tempUser);
        const updatedUser = await User.update(createdUser._id.toString(), {
            username: "수정된유저",
        });
        expect(updatedUser?.password).toBeUndefined();
        expect(updatedUser?.username).toEqual("수정된유저");
    });

    it("removeToken은 유저 정보에서 토큰 필드를 삭제한다.", async () => {
        const createdUser = await User.create({ ...tempUser, token: "테스트토큰" });
        const removeTokenUser = await User.removeToken(createdUser._id.toString());
        expect(removeTokenUser?.token).toBeUndefined();
    });

    it("delete는 유저를 삭제한다.", async () => {
        const createdUser = await User.create(tempUser);
        const deletedUser = await User.delete(createdUser._id.toString());
        expect(deletedUser?.password).toBeUndefined();
        expect(deletedUser?.email).toEqual("test@test.com");
        expect(deletedUser?.username).toEqual("테스트유저");
    });
});
