import { Comment } from "@src/db";
import { IComment } from "@src/models/interface";

describe("Comment 모델 접근", () => {
    const tempComment = {
        content: "댓글작성",
    };

    it("create는 댓글을 생성한다.", () => {
        const createdComment = Comment.create(tempComment as IComment);
        expect(createdComment.content).toEqual("댓글작성");
    });

    it("update는 댓글을 수정한다.", async () => {
        const newComment = Comment.create(tempComment as IComment);
        await newComment.save();
        const updatedPost = await Comment.update(newComment._id.toString(), {
            content: "댓글수정",
        } as IComment);
        expect(updatedPost?.content).toEqual("댓글수정");
    });

    it("댓글을 삭제한다.", async () => {
        const newComment = Comment.create(tempComment as IComment);
        await newComment.save();
        const deletedPost = await Comment.delete(newComment._id.toString());
        expect(deletedPost?.content).toEqual("댓글작성");
    });
});
