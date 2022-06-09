import mongoose from "mongoose";
import "dotenv/config";
import { MongoMemoryServer } from "mongodb-memory-server";

const dbHandler = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const dbConnect = async () => {
        mongoServer.getUri();
        const uri = process.env["MONGODB_URL"];

        if (!uri) throw new Error("no uri");
        await mongoose.connect(uri);
    };

    const dbDisconnect = async () => {
        await mongoose.disconnect();
    };
    return { dbConnect, dbDisconnect };
};

beforeAll(async () => {
    const { dbConnect } = await dbHandler();
    await dbConnect();
});
afterAll(async () => {
    const { dbDisconnect } = await dbHandler();
    await dbDisconnect();
});
