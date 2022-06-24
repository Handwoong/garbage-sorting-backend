import app from "@src/app";
import request from "supertest";
import { IPost, IUser } from "@src/models/interface";
import { PostService } from "@src/service/post.service";
import { UserService } from "@src/service/user.service";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";
import { createAccessToken, createRefreshToken } from "@src/utils/jwt";

describe("POST API", () => {
    const tempPost: IPost = {
        title: "게시글 제목",
        content: "게시글 내용",
    };

    const tempUser: IUser = {
        email: "test@test.com",
        username: "테스트유저",
        password: "testtest",
    };

    it("POST GET/ 게시글목록을 응답받는다.", async () => {
        const res = await request(app).get("/posts");
        expect(res.status).toBe(STATUS_200_OK);
    });

    it("POST/:id GET/ 개별 게시글 정보를 응답받는다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const posts = await PostService.addPost(createdUser._id, tempPost);
        const res = await request(app).get(`/posts/${posts._id}`);
        expect(res.status).toBe(STATUS_200_OK);
    });

    it("POST POST/ 게시글을 생성한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const accessToken = createAccessToken(createdUser._id);
        const refreshToken = createRefreshToken();
        const res = await request(app)
            .post("/posts")
            .set("Cookie", [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`])
            .send(tempPost);
        expect(res.status).toBe(STATUS_201_CREATED);
        expect(res.body).toHaveProperty("title");
        expect(res.body).toHaveProperty("content");
    });

    it("POST PUT/ 게시글을 수정한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const accessToken = createAccessToken(createdUser._id);
        const refreshToken = createRefreshToken();
        const posts = await PostService.addPost(createdUser._id, tempPost);
        const res = await request(app)
            .put(`/posts/${posts._id}`)
            .set("Cookie", [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`])
            .send({ title: "수정된 제목", content: "수정된 내용" });
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body.title).toEqual("수정된 제목");
        expect(res.body.content).toEqual("수정된 내용");
        expect(res.body._id === posts._id.toString()).toBe(true);
    });

    it("POST DELETE/ 게시글을 삭제한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const accessToken = createAccessToken(createdUser._id);
        const refreshToken = createRefreshToken();
        const posts = await PostService.addPost(createdUser._id, tempPost);
        const res = await request(app)
            .delete(`/posts/${posts._id}`)
            .set("Cookie", [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`]);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body.message).toEqual("삭제가 완료되었습니다.");
    });
});
