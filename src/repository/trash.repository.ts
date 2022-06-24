import { TrashModel } from "@src/db/trash/trash.schema";
import { ITrash, MongooseQuery } from "@src/models/interface";

export class Trash {
    static async find({ filteredQuery, limit }: { filteredQuery: MongooseQuery; limit: number }) {
        return TrashModel.find(filteredQuery).sort({ _id: -1 }).limit(limit);
    }

    static async findOne(id: string) {
        return TrashModel.findById(id);
    }

    static async create(trashInfo: ITrash) {
        return TrashModel.create(trashInfo);
    }

    static async update(id: string, trashInfo: ITrash) {
        return TrashModel.findByIdAndUpdate(id, { $set: trashInfo }, { new: true });
    }

    static async delete(id: string) {
        return TrashModel.findByIdAndDelete(id);
    }
}
