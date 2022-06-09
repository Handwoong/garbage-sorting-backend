import app from "@src/app";
import request from "supertest";
import { STATUS_200_OK } from "@src/utils/statusCode";

describe("NEWS GET/", () => {
    it("NEWS 목록을 응답받는다.", async () => {
        const newsList = await request(app).get("/news");
        expect(newsList.status).toBe(STATUS_200_OK);
        expect(newsList.body.length).toBe(10);
    });
});
