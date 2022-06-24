import { Comment } from "@src/db";
import { IComment } from "@src/models/interface";
import { UserService } from "@src/service/user.service";
import { RequestError } from "@src/middlewares/errorHandler";
import { PostService } from "@src/service/post.service";

export class CommentService {
    static async addComment(userId: string, postId: string, commentInfo: IComment) {
        const [userInfo, postInfo] = await Promise.all([
            UserService.getByUser(userId),
            PostService.getByPost(postId),
        ]);
        if (!userInfo) throw new RequestError("로그인 사용자를 찾을 수 없습니다.");
        if (!postInfo) throw new RequestError("게시글 정보를 찾을 수 없습니다.");
        commentInfo.author = userInfo;
        const newComment = Comment.create(commentInfo);
        postInfo?.comments?.push(newComment);

        const [updatedPost, createdComment] = await Promise.all([
            postInfo.save(),
            newComment.save(),
        ]);
        if (!createdComment) throw new RequestError("댓글 등록에 실패하였습니다.");
        if (!updatedPost) throw new RequestError("게시글 업데이트에 실패하였습니다.");
        return createdComment;
    }

    static async updateComment(id: string, commentInfo: IComment) {
        const updatedComment = await Comment.update(id, commentInfo);
        if (!updatedComment) throw new RequestError("해당 댓글을 찾을 수 없습니다.");
        return updatedComment;
    }

    static async deleteComment(id: string, postId: string) {
        const [deletedComment] = await Promise.all([
            Comment.delete(id),
            PostService.deleteComment(postId, id),
        ]);
        if (!deletedComment) throw new RequestError("해당 댓글을 찾을 수 없습니다.");
        return { message: "삭제가 완료되었습니다." };
    }
}
