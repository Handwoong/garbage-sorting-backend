import assert from "assert";
import { FilterQuery, MongooseQuery } from "@src/models/interface";

export const createFilterQuery = (query: FilterQuery, filterList: string[]) => {
    const { search, category, page = "", limit = 10 } = query;
    assert(limit > 0, "Limit이 0 또는 음수입니다.");
    const filteredQuery: MongooseQuery = {};

    if (page) {
        Object.assign(filteredQuery, { $and: [{ _id: { $lt: page } }] });
    }

    if (!search && !category) {
        return { filteredQuery, limit };
    }

    if (!page) {
        filteredQuery.$and = [];
    }

    if (category) {
        filteredQuery.$and.push({ $or: [{ category }] });
    }

    if (search) {
        const searchQuery = filterList.map((filterName) => ({
            [filterName]: new RegExp(search),
        }));
        filteredQuery.$and.push({ $or: searchQuery });
    }

    return { filteredQuery, limit };
};
