import { IComment } from "@src/models/interface";
import { CommentModel } from "@src/db/comment/comment.schema";

export class Comment {
    static create(commentInfo: IComment) {
        return new CommentModel(commentInfo);
    }

    static async update(id: string, commentInfo: IComment) {
        return CommentModel.findByIdAndUpdate(id, commentInfo, { new: true });
    }

    static async delete(id: string) {
        return CommentModel.findByIdAndDelete(id);
    }
}
