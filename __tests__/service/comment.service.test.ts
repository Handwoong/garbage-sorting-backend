import { Comment } from "@src/db";
import { IComment, IPost, IUser } from "@src/models/interface";
import { CommentService } from "@src/service/comment.service";
import { UserService } from "@src/service/user.service";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_400_BADREQUEST } from "@src/utils/statusCode";
import { PostService } from "@src/service/post.service";

const tempComment = {
    content: "댓글 내용",
};

const tempPost: IPost = {
    title: "게시글 제목",
    content: "게시글 내용",
};

const tempUser: IUser = {
    email: "test@test.com",
    username: "테스트유저",
    password: "testtest",
};

describe("COMMENTS SERVICE LOGIC", () => {
    it("COMMENT를 생성한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const createdPost = await PostService.addPost(createdUser._id, {
            ...tempPost,
            title: "게시글 생성",
        });
        const createdComment = await CommentService.addComment(
            createdUser._id,
            createdPost._id.toString(),
            tempComment as IComment,
        );
        expect(createdComment.content).toEqual("댓글 내용");
    });

    it("COMMENT를 수정한다.", async () => {
        const spyFn = jest.spyOn(Comment, "update");
        const createdUser = await UserService.addUser(tempUser);
        const createdPost = await PostService.addPost(createdUser._id, tempPost);
        const createdComment = await CommentService.addComment(
            createdUser._id,
            createdPost._id.toString(),
            tempComment as IComment,
        );
        const updatedComment = await CommentService.updateComment(createdComment._id.toString(), {
            content: "내용 수정",
        } as IComment);
        expect(spyFn).toBeCalledTimes(1);
        expect(updatedComment.content).toEqual("내용 수정");
    });

    it("COMMENT를 삭제한다.", async () => {
        const spyFn = jest.spyOn(Comment, "delete");
        const createdUser = await UserService.addUser(tempUser);
        const createdPost = await PostService.addPost(createdUser._id, tempPost);
        const createdComment = await CommentService.addComment(
            createdUser._id,
            createdPost._id.toString(),
            tempComment as IComment,
        );
        const deleteResult = await CommentService.deleteComment(
            createdComment._id.toString(),
            createdPost._id.toString(),
        );
        expect(spyFn).toBeCalledTimes(1);
        expect(deleteResult.message).toBe("삭제가 완료되었습니다.");
    });
});

describe("COMMENT SERVICE ERROR HANDLING", () => {
    it("COMMENT 생성 시 사용자를 찾지 못하면 에러가 발생한다.", async () => {
        UserService.getByUser = jest.fn().mockResolvedValue(null);
        PostService.getByPost = jest.fn().mockResolvedValue(true);
        try {
            await CommentService.addComment("id", "postId", tempComment as IComment);
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("로그인 사용자를 찾을 수 없습니다.");
        }
    });

    it("COMMENT 생성 시 게시글을 찾지 못하면 에러가 발생한다.", async () => {
        UserService.getByUser = jest.fn().mockResolvedValue(true);
        PostService.getByPost = jest.fn().mockResolvedValue(null);
        try {
            await CommentService.addComment("id", "postId", tempComment as IComment);
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("게시글 정보를 찾을 수 없습니다.");
        }
    });

    it("COMMENT 수정 시 댓글을 찾을 수 없으면 에러가 발생한다.", async () => {
        Comment.update = jest.fn().mockResolvedValue(null);
        try {
            await CommentService.updateComment("id", tempComment as IComment);
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("해당 댓글을 찾을 수 없습니다.");
        }
    });

    it("POSTS 삭제 시 댓글을 찾을 수 없으면 에러가 발생한다.", async () => {
        Comment.delete = jest.fn().mockResolvedValue(null);
        PostService.deleteComment = jest.fn().mockResolvedValue(true);
        try {
            await CommentService.deleteComment("id", "postId");
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("해당 댓글을 찾을 수 없습니다.");
        }
    });
});
