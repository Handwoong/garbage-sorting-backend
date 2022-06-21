const options = { autoHeaders: false, autoQuery: false, autoBody: false };
const swaggerAutogen = require("swagger-autogen")(
    options,
    { openapi: "3.0.0" },
    {
        language: "ko",
    },
);

const doc = {
    info: {
        title: "분리수ZIP 서비스 API",
        description: "엘리스 AI 트랙 4기 - AI Project 10팀 TOPTEN 프로젝트 문서.",
    },
    host: "home.handwoong.com:5001",
    schemes: ["http"],
    securityDefinitions: {
        // * JWT 토큰 설정을 위한 코드
        bearerAuth: {
            type: "http",
            scheme: "bearer",
            in: "header",
            bearerFormat: "JWT",
        },
    },
    tags: [
        {
            name: "news",
            description: "뉴스 데이터 API",
        },
        {
            name: "quiz",
            description: "퀴즈 데이터 API",
        },
        {
            name: "trash",
            description: "쓰레기 데이터 API",
        },
        {
            name: "user",
            description: "유저 데이터 API",
        },
        {
            name: "bins",
            description: "쓰레기통위치 데이터 API",
        },
    ],
    definitions: {
        NewsId: "news/{newsId}",
        NewsGetQuery: "?search={}&page={ID}&limit={5}",
        NewsGetResponse: [{ _id: "id", url: "http://", title: "제목" }],
        NewsPostQuery: { url: "http://", title: "제목" },
        NewsPostResponse: { _id: "id", url: "http://", title: "제목" },
        NewsPutBody: { url: "http://", title: "수정된제목" },
        NewsPutResponse: { _id: "id", url: "http://", title: "수정된제목" },
        DeleteResponse: { message: "삭제가 완료되었습니다." },
        UserId: "users/{userId}",
        UserGetResponse: {
            _id: "62acd51598886269f298521e",
            email: "test@test.com",
            username: "테스트",
            __v: 0,
        },
        UserRequest: {
            email: "test@test.com",
            password: "test1234",
            username: "테스트유저",
        },
        UserLoginRequest: {
            email: "test@test.com",
            password: "test1234",
        },
        UserLogoutResponse: { message: "정상적으로 로그아웃이 완료되었습니다." },
        TrashId: "trash/{trashId}",
        TrashGetQuery: "?search={}&category={}&page={ID}&limit={5}",
        TrashGetResponse: [
            {
                _id: "62a1624d1458dc8c48ab52ca",
                title: "컵라면",
                description: {
                    throwAway: [
                        "컵라면 용기를 물로 세척",
                        "햇빛에 하루 이상 말려 기름, 국물 자국 제거",
                        "흰 색의 용기로 만든 뒤 배출",
                    ],
                    note: [
                        "라면 국물이 남아있거나, 음식물이 완전히 제거 되지 않은 컵라면 용기는 재활용 불가능하므로 일반쓰레기로 배출",
                    ],
                },
                kind: ["다양한 스티로폼 컵라면 용기"],
                image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/PSP%EB%9D%BC%EB%A9%B4%EC%9A%A9%EA%B8%B0.png",
                recycle: true,
                category: ["스티로폼"],
                __v: 0,
            },
        ],
        TrashOneGetResponse: {
            _id: "62a1624d1458dc8c48ab52ca",
            title: "컵라면",
            description: {
                throwAway: [
                    "컵라면 용기를 물로 세척",
                    "햇빛에 하루 이상 말려 기름, 국물 자국 제거",
                    "흰 색의 용기로 만든 뒤 배출",
                ],
                note: [
                    "라면 국물이 남아있거나, 음식물이 완전히 제거 되지 않은 컵라면 용기는 재활용 불가능하므로 일반쓰레기로 배출",
                ],
            },
            kind: ["다양한 스티로폼 컵라면 용기"],
            image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/PSP%EB%9D%BC%EB%A9%B4%EC%9A%A9%EA%B8%B0.png",
            recycle: true,
            category: ["스티로폼"],
            __v: 0,
        },
        TrashCategoryGetResponse: [
            {
                name: "플라스틱",
                image: "https://blisgo.com/wp-content/uploads/elementor/thumbs/%ED%8E%98%ED%8A%B8%EB%B3%91-osxqcextwey39nv9bbiwyx92fih9hl1i4rtny3m70g.jpg",
            },
        ],
        TrashPostRequest: {
            title: "컵라면",
            description: {
                throwAway: [
                    "컵라면 용기를 물로 세척",
                    "햇빛에 하루 이상 말려 기름, 국물 자국 제거",
                    "흰 색의 용기로 만든 뒤 배출",
                ],
                note: [
                    "라면 국물이 남아있거나, 음식물이 완전히 제거 되지 않은 컵라면 용기는 재활용 불가능하므로 일반쓰레기로 배출",
                ],
            },
            kind: ["다양한 스티로폼 컵라면 용기"],
            image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/PSP%EB%9D%BC%EB%A9%B4%EC%9A%A9%EA%B8%B0.png",
            recycle: true,
            category: ["스티로폼"],
        },
        TrashPostResponse: {
            _id: "62a1624d1458dc8c48ab52ca",
            title: "컵라면",
            description: {
                throwAway: [
                    "컵라면 용기를 물로 세척",
                    "햇빛에 하루 이상 말려 기름, 국물 자국 제거",
                    "흰 색의 용기로 만든 뒤 배출",
                ],
                note: [
                    "라면 국물이 남아있거나, 음식물이 완전히 제거 되지 않은 컵라면 용기는 재활용 불가능하므로 일반쓰레기로 배출",
                ],
            },
            kind: ["다양한 스티로폼 컵라면 용기"],
            image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/PSP%EB%9D%BC%EB%A9%B4%EC%9A%A9%EA%B8%B0.png",
            recycle: true,
            category: ["스티로폼"],
            __v: 0,
        },
        TrashPutRequest: {
            title: "수정된제목",
            description: {
                throwAway: [
                    "수정",
                    "햇빛에 하루 이상 말려 기름, 국물 자국 제거",
                    "흰 색의 용기로 만든 뒤 배출",
                ],
                note: [
                    "라면 국물이 남아있거나, 음식물이 완전히 제거 되지 않은 컵라면 용기는 재활용 불가능하므로 일반쓰레기로 배출",
                ],
            },
            kind: ["다양한 스티로폼 컵라면 용기"],
            image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/PSP%EB%9D%BC%EB%A9%B4%EC%9A%A9%EA%B8%B0.png",
            recycle: true,
            category: ["스티로폼"],
        },
        TrashPutResponse: {
            _id: "62a1624d1458dc8c48ab52ca",
            title: "수정된제목",
            description: {
                throwAway: [
                    "수정",
                    "햇빛에 하루 이상 말려 기름, 국물 자국 제거",
                    "흰 색의 용기로 만든 뒤 배출",
                ],
                note: [
                    "라면 국물이 남아있거나, 음식물이 완전히 제거 되지 않은 컵라면 용기는 재활용 불가능하므로 일반쓰레기로 배출",
                ],
            },
            kind: ["다양한 스티로폼 컵라면 용기"],
            image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/PSP%EB%9D%BC%EB%A9%B4%EC%9A%A9%EA%B8%B0.png",
            recycle: true,
            category: ["스티로폼"],
            __v: 0,
        },
        QuizId: "62a455ad6059af946a56e717",
        QuizType: "?type=multipleChoice",
        QuizUserAnswer: { answer: "1" },
        QuizResult: { isCorrect: true },
        QuizSetSubmission: {
            type: "multipleChoice",
            answers: [
                {
                    quizId: "62a455ad6059af946a56e717",
                    answer: "1",
                },
                {
                    quizId: "62a455ad6059af946a56e715",
                    answer: "2",
                },
                {
                    quizId: "62a455ad6059af946a56e71b",
                    answer: "0",
                },
                {
                    quizId: "62a455ad6059af946a56e719",
                    answer: "3",
                },
            ],
        },
        QuizSetResult: {
            result: [
                {
                    quizId: "62a163ddac4b496254c13d9e",
                    isCorrect: true,
                },
                {
                    quizId: "62a163ddac4b496254c13d9c",
                    isCorrect: true,
                },
                {
                    quizId: "62a163ddac4b496254c13da2",
                    isCorrect: true,
                },
                {
                    quizId: "62a163ddac4b496254c13da0",
                    isCorrect: true,
                },
            ],
            score: 100,
        },
        QuizByType: [
            {
                _id: "62a455ad6059af946a56e717",
                title: "유통기한 지난 의약품의 분리배출 방법으로 옳은 것을 고르시오.",
                description:
                    "폐의약품을 그냥 버릴 경우 환경오염을 일으킬 수 있다. 약국에 비치된 폐의약품 수거함에 버린다.",
                options: [
                    "일반쓰레기로 버린다.",
                    "약국에 비치된 폐의약품 수거함에 버린다.",
                    "내 뱃속에 버린다.",
                    "약사님께 드린다.",
                ],
                answer: "1",
                type: "multipleChoice",
                image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1840&q=80",
                result: [
                    {
                        date: "2022-06-11T08:43:25.335Z",
                        totalUser: 2,
                        wrong: 1,
                        yesterday: 0,
                        _id: "62a455ad6059af946a56e718",
                    },
                ],
                __v: 0,
            },
        ],
        BinsQuery: "?search=종로구&category=삼청로",
        BinsLocation: [
            {
                _id: "62ab6bef76d07566b0026be9",
                region: "종로구",
                roads: "삼청로",
                details: "삼청로1 맞은편 인도",
                points: "광장, 공원 등 다중집합장소",
                address: "서울 종로구 삼청로 1",
                type: ["일반", "재활용"],
                x: "126.9794122718",
                y: "37.5760952177",
                __v: 0,
            },
        ],
        LocationList: {
            uniqueRegionList: ["종로구", "용산구", "성동구", "광진구", "중랑구"],
            uniqueRoadList: ["자하문로", "삼청로", "원효로", "마장로", "왕십리로", "마조로"],
        },
    },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/api/**/*.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
