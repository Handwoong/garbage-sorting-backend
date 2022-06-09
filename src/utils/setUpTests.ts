import "dotenv/config";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

(async () => {
    const mongoServer = await MongoMemoryServer.create();
    mongoServer.getUri();
})();

const dbConnect = async () => {
    const uri = process.env["MONGODB_URL"];
    if (!uri) throw new Error("no uri");
    await mongoose.connect(uri);
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
