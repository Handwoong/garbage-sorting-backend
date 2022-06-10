import "dotenv/config";
import mongoose from "mongoose";
import server from "@src/server";
import { MongoMemoryServer } from "mongodb-memory-server";

beforeAll(async () => {
    if (process.env.NODE_ENV === "test") {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    }
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
    server.close();
    await mongoose.disconnect();
});
