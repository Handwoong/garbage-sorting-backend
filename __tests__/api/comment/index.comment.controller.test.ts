import app from "@src/app";
import request from "supertest";
import { IComment, IPost, IUser } from "@src/models/interface";
import { PostService } from "@src/service/post.service";
import { UserService } from "@src/service/user.service";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";
import { createAccessToken, createRefreshToken } from "@src/utils/jwt";
import { CommentService } from "@src/service/comment.service";

describe("COMMENT API", () => {
    const tempComment = {
        content: "댓글 내용",
    };

    const tempUser: IUser = {
        email: "test@test.com",
        username: "테스트유저",
        password: "testtest",
    };

    const tempPost: IPost = {
        title: "게시글 제목",
        content: "게시글 내용",
    };

    it("COMMENT POST/ 댓글을 생성한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const createdPost = await PostService.addPost(createdUser._id, tempPost);
        const accessToken = createAccessToken(createdUser._id);
        const refreshToken = createRefreshToken();
        const res = await request(app)
            .post(`/comments/${createdPost._id}`)
            .set("Cookie", [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`])
            .send(tempComment);
        expect(res.status).toBe(STATUS_201_CREATED);
        expect(res.body).toHaveProperty("author");
        expect(res.body).toHaveProperty("content");
    });

    it("COMMENT PUT/ 댓글을 수정한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const createdPost = await PostService.addPost(createdUser._id, tempPost);
        const accessToken = createAccessToken(createdUser._id);
        const refreshToken = createRefreshToken();
        const createdComment = await CommentService.addComment(
            createdUser._id,
            createdPost._id.toString(),
            tempComment as IComment,
        );
        const res = await request(app)
            .put(`/comments/${createdComment._id}`)
            .set("Cookie", [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`])
            .send({ content: "수정된 내용" });
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body.content).toEqual("수정된 내용");
        expect(res.body._id === createdComment._id.toString()).toBe(true);
    });

    it("COMMENT DELETE/ 댓글을 삭제한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const createdPost = await PostService.addPost(createdUser._id, tempPost);
        const accessToken = createAccessToken(createdUser._id);
        const refreshToken = createRefreshToken();
        const createdComment = await CommentService.addComment(
            createdUser._id,
            createdPost._id.toString(),
            tempComment as IComment,
        );
        const res = await request(app)
            .delete(`/comments/${createdComment._id}/posts/${createdPost._id}`)
            .set("Cookie", [`accessToken=${accessToken}`, `refreshToken=${refreshToken}`]);
        expect(res.status).toBe(STATUS_200_OK);
        expect(res.body.message).toEqual("삭제가 완료되었습니다.");
    });
});
