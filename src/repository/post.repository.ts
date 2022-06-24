import { PostModel } from "@src/db/post/post.schema";
import { IPost, MongooseQuery } from "@src/models/interface";

export class Post {
    static async find({ filteredQuery, limit }: { filteredQuery: MongooseQuery; limit: number }) {
        return PostModel.find(filteredQuery)
            .sort({ _id: -1 })
            .limit(limit)
            .populate("author", "-password -token")
            .populate({
                path: "comments",
                populate: { path: "author", select: "-password -token" },
            });
    }

    static async findById(id: string) {
        return PostModel.findById(id)
            .populate("author", "-password -token")
            .populate({
                path: "comments",
                populate: { path: "author", select: "-password -token" },
            });
    }

    static async create(postInfo: IPost) {
        return PostModel.create(postInfo);
    }

    static async update(id: string, postInfo: IPost) {
        return PostModel.findByIdAndUpdate(id, postInfo, { new: true });
    }

    static async delete(id: string) {
        return PostModel.findOneAndDelete({ _id: id });
    }

    static async pullComment(id: string, commentId: string) {
        return PostModel.findByIdAndUpdate(id, { $pull: { comments: commentId } }, { new: true });
    }
}
