import { Post } from "@src/db";
import { IPost, IUser } from "@src/models/interface";
import { PostService } from "@src/service/post.service";
import { UserService } from "@src/service/user.service";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_400_BADREQUEST, STATUS_404_NOTFOUND } from "@src/utils/statusCode";

const tempPost: IPost = {
    title: "게시글 제목",
    content: "게시글 내용",
};

const tempUser: IUser = {
    email: "test@test.com",
    username: "테스트유저",
    password: "testtest",
};

describe("POSTS SERVICE LOGIC", () => {
    it("POSTS 목록을 반환한다.", async () => {
        Post.find = jest.fn().mockResolvedValue([tempPost]);
        const postList = await PostService.getPostList({});
        expect(postList).toHaveLength(1);
        expect(postList[0].title).toEqual("게시글 제목");
        expect(postList[0].content).toEqual("게시글 내용");
    });

    it("단일 POSTS를 반환한다.", async () => {
        Post.findById = jest.fn().mockResolvedValue(tempPost);
        const foundPostInfo = await PostService.getByPost("id");
        expect(foundPostInfo.title).toEqual("게시글 제목");
        expect(foundPostInfo.content).toEqual("게시글 내용");
    });

    it("POSTS를 생성한다.", async () => {
        const createdUser = await UserService.addUser(tempUser);
        const createdPost = await PostService.addPost(createdUser._id, {
            ...tempPost,
            title: "게시글 생성",
        });
        expect(createdPost.title).toEqual("게시글 생성");
        expect(createdPost.content).toEqual("게시글 내용");
        expect(createdPost.author).toHaveProperty("username");
    });

    it("POSTS를 수정한다.", async () => {
        const spyFn = jest.spyOn(Post, "update");
        const createdUser = await UserService.addUser(tempUser);
        const newPost = await PostService.addPost(createdUser._id, tempPost);
        const updatedPost = await PostService.updatePost(newPost._id.toString(), {
            ...tempPost,
            content: "내용 수정",
        });
        expect(spyFn).toBeCalledTimes(1);
        expect(updatedPost.title).toEqual("게시글 제목");
        expect(updatedPost.content).toEqual("내용 수정");
    });

    it("POSTS를 삭제한다.", async () => {
        const spyFn = jest.spyOn(Post, "delete");
        const createdUser = await UserService.addUser(tempUser);
        const targetPost = await PostService.addPost(createdUser._id, tempPost);
        const deleteResult = await PostService.deletePost(targetPost._id.toString());
        expect(spyFn).toBeCalledTimes(1);
        expect(deleteResult.message).toBe("삭제가 완료되었습니다.");
    });
});

describe("POSTS SERVICE ERROR HANDLING", () => {
    it("POSTS 목록이 null이나 undefined라면 에러를 발생시킨다.", async () => {
        Post.find = jest.fn().mockResolvedValue(null);
        try {
            await PostService.getPostList({});
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_404_NOTFOUND);
            expect(err.message).toBe("게시글 목록을 가져올 수 없습니다.");
        }
    });

    it("단일 POSTS를 찾지 못하면 에러를 발생시킨다.", async () => {
        Post.findById = jest.fn().mockResolvedValue(null);
        try {
            await PostService.getByPost("id");
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("게시글 정보를 가져올 수 없습니다.");
        }
    });

    it("POSTS 생성 시 사용자를 찾지 못하면 에러가 발생한다.", async () => {
        UserService.getByUser = jest.fn().mockResolvedValue(null);
        try {
            await PostService.addPost("id", tempPost);
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("로그인 사용자를 찾을 수 없습니다.");
        }
    });

    it("POSTS 생성 시 생성된 게시글이 없으면 에러가 발생한다.", async () => {
        UserService.getByUser = jest.fn().mockResolvedValue(true);
        Post.create = jest.fn().mockResolvedValue(null);
        try {
            await PostService.addPost("id", tempPost);
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("게시글 등록에 실패하였습니다.");
        }
    });

    it("POSTS 수정 시 게시글을 찾을 수 없으면 에러가 발생한다.", async () => {
        Post.update = jest.fn().mockResolvedValue(null);
        try {
            await PostService.updatePost("id", tempPost);
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("해당 게시글을 찾을 수 없습니다.");
        }
    });

    it("POSTS 삭제 시 게시글을 찾을 수 없으면 에러가 발생한다.", async () => {
        Post.delete = jest.fn().mockResolvedValue(null);
        try {
            await PostService.deletePost("id");
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("해당 게시글을 찾을 수 없습니다.");
        }
    });

    it("POSTS의 댓글 삭제 시 댓글을 찾을 수 없으면 에러가 발생한다.", async () => {
        Post.pullComment = jest.fn().mockResolvedValue(null);
        try {
            await PostService.deleteComment("id", "postId");
        } catch (err: any) {
            expect(err).toBeInstanceOf(RequestError);
            expect(err.status).toBe(STATUS_400_BADREQUEST);
            expect(err.message).toBe("게시글에서 해당 댓글을 찾을 수 없습니다.");
        }
    });
});
