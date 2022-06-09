import app from "@src/app";
import request from "supertest";

describe("NEWS GET/", () => {
    it("NEWS 응답이 와야한다.", async () => {
        await request(app).get("/news/").expect(200, { message: "NEWS" });
    });
});
