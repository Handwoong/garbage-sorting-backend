import { Post } from "@src/db";
import { IPost } from "@src/models/interface";
import { PostModel } from "@src/db/post/post.schema";

describe("Post 모델 접근", () => {
    const tempPost: IPost = {
        title: "여름",
        content: "너무덥다.",
    };

    it("find는 모델에서 게시글목록을 찾는다.", async () => {
        const spyFn = jest.spyOn(PostModel, "find");
        await Post.find({ filteredQuery: {}, limit: 10 });
        expect(spyFn).toBeCalledTimes(1);
    });

    it("findById는 모델에서 단일 게시글를 찾는다.", async () => {
        const spyFn = jest.spyOn(PostModel, "findById");
        await Post.findById("62a1624d1458dc8c48ab52ca");
        expect(spyFn).toBeCalledTimes(1);
    });

    it("create는 게시글를 생성한다.", async () => {
        const createdPost = await Post.create(tempPost);
        expect(createdPost.title).toEqual("여름");
        expect(createdPost.content).toEqual("너무덥다.");
    });

    it("update는 게시글를 수정한다.", async () => {
        const post = await Post.create(tempPost);
        const updatedPost = await Post.update(post._id.toString(), {
            ...tempPost,
            title: "땡볕",
        });
        expect(updatedPost?.title).toEqual("땡볕");
        expect(updatedPost?.content).toEqual("너무덥다.");
    });

    it("게시글를 삭제한다.", async () => {
        const post = await Post.create(tempPost);
        const deletedPost = await Post.delete(post._id.toString());
        expect(deletedPost?.title).toEqual("여름");
        expect(deletedPost?.content).toEqual("너무덥다.");
    });
});
