import "dotenv/config";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const dbConnect = async () => {
    if (process.env.NODE_ENV === "test") {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    }
};

const dbDisconnect = async () => {
    await mongoose.disconnect();
};

beforeAll(async () => {
    await dbConnect();
});

afterAll(async () => {
    await dbDisconnect();
});
