import { BinsModel } from "@src/db/map/bins.schema";

export class Bins {
    static async findLocation(
        filterQuery: (
            | { region: string; roads?: undefined }
            | { roads: string; region?: undefined }
        )[],
    ) {
        return await BinsModel.find({ $and: filterQuery });
    }

    static async findAll() {
        return await BinsModel.find({});
    }
}
