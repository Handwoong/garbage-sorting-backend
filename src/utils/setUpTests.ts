import "dotenv/config";
import mongoose from "mongoose";
import server from "@src/server";
import { MongoMemoryServer } from "mongodb-memory-server";
jest.useRealTimers();

const dbConnect = async () => {
    if (process.env.NODE_ENV === "test") {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    }
};

const dbClear = async () => {
    await mongoose.connection.db.dropDatabase();
};

const dbDisconnect = async () => {
    await mongoose.disconnect();
};

beforeAll(async () => {
    jest.setTimeout(20000);
    await dbConnect();
});

beforeEach(async () => {
    await dbClear();
});

afterAll(async () => {
    server.close();
    await dbDisconnect();
});
