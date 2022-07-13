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
        super("페트병", "페트류", ["페트병", "뚜껑", "라벨"], THROW_AWAY.PET[0]);
    }

    setThrowAway(idx: number): void {
        if (idx === 1)
            THROW_AWAY.PET[idx + 1][0] = "페트병을 찌그러뜨리고 뚜껑은 플라스틱으로 배출";
        THROW_AWAY.PET[idx + 1].map((throwAway) => {
            this.throwAway.push(throwAway);
        });
    }
}

class CartonAiResult extends AiResult {
    constructor() {
        super("종이팩", "종이팩", ["종이팩", "뚜껑", "빨대"], THROW_AWAY.CARTON[0]);
    }

    setThrowAway(idx: number): void {
        THROW_AWAY.CARTON[idx + 1].map((throwAway) => {
            this.throwAway.push(throwAway);
        });
    }
}

class CanAiResult extends AiResult {
    constructor() {
        super("캔", "캔/고철", ["캔"], THROW_AWAY.CAN[0]);
    }

    setThrowAway(): void {
        return;
    }
}

class PaperAiResult extends AiResult {
    constructor() {
        super("종이", "종이류", ["종이"], THROW_AWAY.PAPER[0]);
    }

    setThrowAway(): void {
        return;
    }
}

class PlasticAiResult extends AiResult {
    constructor() {
        super("플라스틱", "플라스틱", ["플라스틱"], THROW_AWAY.PLASTIC[0]);
    }

    setThrowAway(idx: number): void {
        THROW_AWAY.PLASTIC[idx + 1].map((throwAway) => {
            this.throwAway.push(throwAway);
        });
    }
}

class VinylAiResult extends AiResult {
    constructor() {
        super("비닐", "비닐류", ["비닐류"], THROW_AWAY.VINYL[0]);
    }

    setThrowAway(): void {
        return;
    }
}

function petAiResult(aiResponse: IAiResponse) {
    const resultTemplate = new PetAiResult();
    const { 6: resPetBody, 7: resPetHead, 8: resPetLabel } = aiResponse;
    resultTemplate.createTemplate([resPetLabel, resPetHead, resPetBody]);
    return resultTemplate;
}

function cartonAiResult(aiResponse: IAiResponse) {
    const resultTemplate = new CartonAiResult();
    const { 1: resCartonBody, 2: resCartonHead, 3: resCartonStraw } = aiResponse;
    resultTemplate.createTemplate([resCartonStraw, resCartonHead, resCartonBody]);
    return resultTemplate;
}

function canAiResult(aiResponse: IAiResponse) {
    const resultTemplate = new CanAiResult();
    const { 0: resCanBody } = aiResponse;
    resultTemplate.createTemplate([resCanBody]);
    return resultTemplate;
}

function paperAiResult(aiResponse: IAiResponse) {
    const resultTemplate = new PaperAiResult();
    const { 5: resPaperBody } = aiResponse;
    resultTemplate.createTemplate([resPaperBody]);
    return resultTemplate;
}

function plasticAiResult(aiResponse: IAiResponse) {
    const resultTemplate = new PlasticAiResult();
    const { 10: resPlasticBody } = aiResponse;
    resultTemplate.createTemplate([resPlasticBody]);
    return resultTemplate;
}

function vinylAiResult(aiResponse: IAiResponse) {
    const resultTemplate = new VinylAiResult();
    const { 11: resVinylBody } = aiResponse;
    resultTemplate.createTemplate([resVinylBody]);
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
