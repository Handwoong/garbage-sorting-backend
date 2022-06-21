import "dotenv/config";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { MongoMemoryServer } from "mongodb-memory-server";

export const mockRequest = (body?: object, params?: object, cookies?: object): Request => {
    const req: unknown = {
        body,
        params,
        cookies,
    };
    return req as Request;
};

export const mockResponse = (): Response => {
    const res: unknown = {
        status: jest.fn(() => res),
        send: jest.fn(),
        json: jest.fn((message) => ({ message })),
        cookie: jest.fn((key, value) => ({ [key]: value })),
    };
    return res as Response;
};

export const mockNext = (): NextFunction => {
    const next: unknown = jest.fn();
    return next as NextFunction;
};

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
    await mongoose.disconnect();
});
