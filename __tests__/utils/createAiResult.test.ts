import { createAiResult } from "@src/utils/createAiResult";

describe("AI 분석 결과 템플릿", () => {
    it("분석 RESPONSE에 type이 없다면 분석 실패 메시지가 반환된다.", () => {
        const result: any = createAiResult({ type: "" });
        expect(result.message).toEqual("분석결과를 찾을 수 없습니다.");
    });

    it("분석 RESPONSE의 type이 페트병이면 페트템플릿을 반환한다.", () => {
        const result: any = createAiResult({
            type: "Pet_Total",
            "6": { confidence: 80 },
            "7": { confidence: 90 },
            "8": { confidence: 100 },
        });
        expect(result.section[1].score).toBe(90);
        expect(result.throwAway).toHaveLength(5);
    });

    it("분석 RESPONSE의 type이 종이팩이면 종이팩 템플릿을 반환한다.", () => {
        const result: any = createAiResult({
            type: "Carton_Total",
            "1": { confidence: 80 },
            "2": { confidence: 90 },
            "3": { confidence: 100 },
        });
        expect(result.section[1].score).toBe(90);
        expect(result.throwAway).toHaveLength(4);
    });

    it("분석 RESPONSE의 type이 캔이면 캔 템플릿을 반환한다.", () => {
        const result: any = createAiResult({
            type: "Can_Total",
            "0": { confidence: 80 },
        });
        expect(result.section[0].score).toBe(80);
        expect(result.throwAway).toHaveLength(3);
    });

    it("분석 RESPONSE의 type이 종이이면 종이 템플릿을 반환한다.", () => {
        const result: any = createAiResult({
            type: "Paper_Total",
            "5": { confidence: 80 },
        });
        expect(result.section[0].score).toBe(80);
        expect(result.throwAway).toHaveLength(3);
    });

    it("분석 RESPONSE의 type이 비닐이면 비닐 템플릿을 반환한다.", () => {
        const result: any = createAiResult({
            type: "Vinyl_Total",
            "11": { confidence: 80 },
        });
        expect(result.section[0].score).toBe(80);
        expect(result.throwAway).toHaveLength(2);
    });

    it("분석 RESPONSE의 type이 플라스틱이면 플라스틱 템플릿을 반환한다.", () => {
        const result: any = createAiResult({
            type: "Plastic_Total",
            "10": { confidence: 80 },
        });
        expect(result.section[0].score).toBe(80);
        expect(result.throwAway).toHaveLength(5);
    });
});
