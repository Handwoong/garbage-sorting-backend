import { Post } from "@src/repository";
import { UserService } from "@src/service";
import { createFilterQuery } from "@src/utils/createQuery";
import { STATUS_404_NOTFOUND } from "@src/utils/statusCode";
import { RequestError } from "@src/middlewares/errorHandler";
import { FilterQuery, IComment, IPost } from "@src/models/interface";

export class PostService {
    static async getPostList(query: FilterQuery) {
        const filterList = ["title", "content"];
        const { filteredQuery, limit } = createFilterQuery(query, filterList);
        const foundPostList = await Post.find({ filteredQuery, limit });
        if (!foundPostList)
            throw new RequestError("게시글 목록을 가져올 수 없습니다.", STATUS_404_NOTFOUND);
        return foundPostList;
    }

    static async getByPost(id: string) {
        const foundPostInfo = await Post.findById(id);
        if (!foundPostInfo) throw new RequestError("게시글 정보를 가져올 수 없습니다.");
        return foundPostInfo;
    }

    static async addPost(id: string, postInfo: IPost) {
        const foundUser = await UserService.getByUser(id);
        if (!foundUser) throw new RequestError("로그인 사용자를 찾을 수 없습니다.");
        postInfo.author = foundUser;
        const createdPost = await Post.create(postInfo);
        if (!createdPost) throw new RequestError("게시글 등록에 실패하였습니다.");
        return createdPost;
    }

    static async addComment(userId: string, postId: string, commentInfo: IComment) {
        const [foundUser, foundPost] = await Promise.all([
            UserService.getByUser(userId),
            Post.findById(postId),
        ]);
        if (!foundUser) throw new RequestError("로그인 사용자를 찾을 수 없습니다.");
        if (!foundPost) throw new RequestError("게시글 정보를 찾을 수 없습니다.");
        const { _id, username } = foundUser;
        commentInfo.author = { userId: _id.toString(), username: username ?? "익명" };
        foundPost?.comments?.push(commentInfo);
        await foundPost.save();
        return commentInfo;
    }

    static async updatePost(id: string, postInfo: IPost) {
        const updatedPost = await Post.updatePost(id, postInfo);
        if (!updatedPost) throw new RequestError("해당 게시글을 찾을 수 없습니다.");
        return updatedPost;
    }

    static async updateComment(postId: string, commentId: string, commentInfo: IComment) {
        const updatedComment = await Post.updateComment(postId, commentId, commentInfo);
        if (!updatedComment) throw new RequestError("해당 댓글을 찾을 수 없습니다.");
        return updatedComment;
    }

    static async deletePost(id: string) {
        const deletedPost = await Post.deletePost(id);
        if (!deletedPost) throw new RequestError("해당 게시글을 찾을 수 없습니다.");
        return { message: "삭제가 완료되었습니다." };
    }

    static async deleteComment(postId: string, commentId: string) {
        const deletedPostComment = await Post.deleteComment(postId, commentId);
        if (!deletedPostComment) throw new RequestError("게시글에서 해당 댓글을 찾을 수 없습니다.");
        return { message: "삭제가 완료되었습니다." };
    }
}
