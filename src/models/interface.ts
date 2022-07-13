export interface INews {
    url: string;
    title: string;
}

export const enum Category {
    Plastic = "플라스틱",
    Styrofoam = "스티로폼",
    Glass = "유리",
    Can = "캔",
    FoodWaste = "음식물",
    Trash = "일반",
    Paper = "종이",
    Vinyl = "비닐",
}

export enum Answer {
    ZERO = "0",
    ONE = "1",
    TWO = "2",
    THREE = "3",
    O = "O",
    X = "X",
    FOOD = "음식물",
    GENERAL = "일반",
}

export enum QuizType {
    MULTI = "multipleChoice",
    OX = "ox",
    MIXUP = "mixUp",
}

export interface ITrash {
    title: string;
    description: { throwAway: string[]; note: string[] };
    kind: string[];
    image: string;
    recycle: boolean;
    category: Category[];
}

export interface FilterQuery {
    search?: string;
    category?: string;
    page?: string;
    limit?: number;
    pageno?: number;
    type?: string;
}

export interface MongooseQuery {
    $and?: any;
    $or?: any;
}

export interface GeoQuery {
    location: {
        $near: {
            $geometry: {
                type: string;
                coordinates: number[];
            };
            $maxDistance: number;
        };
    };
}

export interface Submissions {
    type: string;
    answers: { quizId: string; answer: string }[];
}

export interface Result {
    date: Date;
    totalUser: number;
    wrong: number;
    yesterday: number;
}

export interface IUser {
    email: string;
    username?: string;
    password?: string;
    topscore?: number;
}

export interface IBins {
    region: string;
    roads: string;
    details: string;
    points: string;
    address: string;
    type: string[];
    x: string;
    y: string;
}

export interface IQuiz {
    title: string;
    description: string;
    options: string[];
    answer: string;
    result: Result[];
    type: string;
    image: string;
}

export interface IComment {
    author?: { userId: string; username: string };
    content: string;
}

export interface IPost {
    title: string;
    author?: IUser;
    content: string;
    comments?: IComment[];
}

export interface IRobot {
    name: string;
    address: string;
    location: object;
}

export type AiSection = {
    title: string;
    score: number;
};

export type AiOneResponse = {
    confidence: number;
};

export interface IAiResponse {
    type: string;
    [key: number]: AiOneResponse;
}
