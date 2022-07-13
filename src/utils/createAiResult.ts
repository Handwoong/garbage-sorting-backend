import { THROW_AWAY } from "@src/utils/constants";
import { AiSection, AiOneResponse, IAiResponse } from "@src/models/interface";

abstract class AiResult {
    title: string;
    kind: string;
    section: AiSection[];
    throwAway: string[];

    protected constructor(title: string, kind: string, section: string[], throwAway: string[]) {
        this.title = title;
        this.kind = kind;
        this.section = section.map((title) => ({ title, score: 0 }));
        this.throwAway = throwAway;
    }

    createTemplate(aiResponse: AiOneResponse[]) {
        aiResponse.map((response, idx) => {
            if (!response) return;
            this.setScore(idx, response);
            this.setThrowAway(idx);
        });
    }

    setScore(idx: number, response: AiOneResponse) {
        this.section[idx].score = response.confidence;
    }

    abstract setThrowAway(idx: number): void;
}

class PetAiResult extends AiResult {
    constructor() {
        super("페트병", "페트류", ["페트병", "뚜껑", "라벨"], ["내용물을 비운 뒤 세척"]);
    }

    setThrowAway(idx: number): void {
        if (idx === 1) THROW_AWAY.PET[idx][0] = "페트병을 찌그러뜨리고 뚜껑은 플라스틱으로 배출";
        THROW_AWAY.PET[idx].map((throwAway) => {
            this.throwAway.push(throwAway);
        });
    }
}

function petAiResult(aiResponse: IAiResponse) {
    const resultTemplate = new PetAiResult();
    const { 6: resPetBody, 7: resPetHead, 8: resPetLabel } = aiResponse;
    resultTemplate.createTemplate([resPetLabel, resPetHead, resPetBody]);
    return resultTemplate;
}

function cartonAiResult(aiTarget: any) {
    const { 1: resBody, 2: resHead, 3: resStraw } = aiTarget;
    const resultTemplate = {
        title: "종이팩",
        kind: "종이팩",
        section: [
            { title: "종이팩", score: 0 },
            { title: "뚜껑", score: 0 },
            { title: "빨대", score: 0 },
        ],
        throwAway: ["내용물을 비운 뒤 세척"],
    };

    if (resStraw) {
        resultTemplate.section[2].score = resStraw.confidence;
        resultTemplate.throwAway.push("빨대는 제거하여 일반쓰레기에 버리기");
    }

    if (resHead) {
        resultTemplate.section[1].score = resHead.confidence;
        resultTemplate.throwAway.push("종이팩의 뚜껑은 플라스틱으로 분리하여 버리기");
    }

    if (resBody) {
        resultTemplate.section[0].score = resBody.confidence;
        resultTemplate.throwAway.push("세척한 종이팩을 잘 말려서 종이팩으로 분리배출");
    }

    return resultTemplate;
}

function canAiResult(aiTarget: any) {
    const { 0: resBody } = aiTarget;
    const resultTemplate = {
        title: "캔",
        kind: "캔/고철",
        section: [{ title: "캔", score: 0 }],
        throwAway: [
            "내용물을 비운 뒤 세척",
            "라벨, 스티커 등 제거",
            "최대한 압축 시켜 부피를 줄인 뒤 배출",
        ],
    };

    if (resBody) {
        resultTemplate.section[0].score = resBody.confidence;
    }

    return resultTemplate;
}

function paperAiResult(aiTarget: any) {
    const { 5: resBody } = aiTarget;
    const resultTemplate = {
        title: "종이",
        kind: "종이류",
        section: [{ title: "종이", score: 0 }],
        throwAway: [
            "물에 젖지 않게 하기",
            "이물질이 묻지 않게 하기",
            "신문지는 끈으로 묶어서 배출하면 더 좋음",
        ],
    };

    if (resBody) {
        resultTemplate.section[0].score = resBody.confidence;
    }

    return resultTemplate;
}

function plasticAiResult(aiTarget: any) {
    const { 10: resBody } = aiTarget;
    const resultTemplate = {
        title: "플라스틱",
        kind: "플라스틱",
        section: [{ title: "플라스틱", score: 0 }],
        throwAway: [
            "내용물을 비운 뒤 세척",
            "부착 상표 등을 제거",
            "찌그러뜨리고 뚜껑 닫기",
            "플라스틱으로 분리 후 배출",
        ],
    };

    if (resBody) {
        resultTemplate.section[0].score = resBody.confidence;
        resultTemplate.throwAway.push("세척한 종이팩을 잘 말려서 종이팩으로 분리배출");
    }

    return resultTemplate;
}

function vinylAiResult(aiTarget: any) {
    const { 11: resBody } = aiTarget;
    const resultTemplate = {
        title: "비닐",
        kind: "비닐류",
        section: [{ title: "비닐류", score: 0 }],
        throwAway: [
            "내용물을 비우고 물로 헹구는 등 이물질 제거",
            "장판, 천막, 의류, 침구류 등은 종량제 봉투나 대형폐기물로 배출",
        ],
    };

    if (resBody) {
        resultTemplate.section[0].score = resBody.confidence;
    }

    return resultTemplate;
}

export function createAiResult(aiResponse: IAiResponse) {
    switch (aiResponse.type) {
        case "Pet_Total":
            return petAiResult(aiResponse);
        case "Can_Total":
            return canAiResult(aiResponse);
        case "Carton_Total":
            return cartonAiResult(aiResponse);
        case "Paper_Total":
            return paperAiResult(aiResponse);
        case "Vinyl_Total":
            return vinylAiResult(aiResponse);
        case "Plastic_Total":
            return plasticAiResult(aiResponse);
        default:
            return { message: "분석결과를 찾을 수 없습니다." };
    }
}
