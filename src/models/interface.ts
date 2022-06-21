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
}

export interface MongooseQuery {
    $and?: any;
}

export interface Submissions {
    type: string;
    answers: { quizId: string; answer: string }[];
}

export interface ToUpdate {
    date?: Date;
    totalUser: number;
    wrong: number;
    yesterday?: number;
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
    token?: string;
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
