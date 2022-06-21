import dayjs from "dayjs";
import { Quiz } from "../db/index";
import { Submissions } from "@src/models/interface";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_404_NOTFOUND } from "@src/utils/statusCode";

export class QuizService {
    static async getQuizList(quizType: string) {
        return await Quiz.findByQuizType(quizType);
    }

    static async getQuiz(quizId: string) {
        const quizInfo = await Quiz.findQuizById(quizId);
        if (!quizInfo) {
            const errorMessage = `${quizId}에 해당하는 퀴즈 정보가 없습니다.`;
            throw new RequestError(errorMessage, STATUS_404_NOTFOUND);
        }

        return quizInfo;
    }

    static async getQuizByWrongRate() {
        return await Quiz.findQuizByWrongRate();
    }

    static async getQuizResult(quizId: string, answer: string) {
        const quizResult = { isCorrect: true };
        const todayDate = new Date();
        const quiz = await Quiz.findQuizById(quizId);

        if (!quiz) {
            const errorMessage = `${quizId}에 해당하는 퀴즈 정보가 없습니다.`;
            throw new RequestError(errorMessage, STATUS_404_NOTFOUND);
        }

        const result = quiz.result[quiz.result.length - 1];
        if (answer !== quiz.answer) {
            result.wrong += 1;
            quizResult.isCorrect = false;
        }

        if (dayjs(todayDate).format("YYYY.MM.DD") !== dayjs(result.date).format("YYYY.MM.DD")) {
            const wrongRate = Math.round((result.wrong / result.totalUser) * 100);
            const newResult = {
                date: todayDate,
                totalUser: 1,
                wrong: 0,
                yesterday: isNaN(wrongRate) ? 0 : wrongRate,
            };
            quiz.result.push(newResult);
            await Quiz.upsertQuizInfo(quizId, newResult);
        } else {
            result.totalUser += 1;
            await Quiz.upsertQuizInfo(quizId, result);
        }

        return quizResult;
    }

    static async getQuizSetResults({ type, answers }: Submissions) {
        const quizAnswer = await Quiz.findAnswerByQuizType(type);
        const userAnswer = Object.values(answers);

        let score = 0;
        const result = userAnswer.map((quiz) => {
            const quizId: string = quiz["quizId"];
            const answer: string = quiz["answer"];
            const correctAnswer = quizAnswer.find((quiz) => String(quiz._id) === quizId);
            let isCorrect = false;

            if (!correctAnswer) {
                const errorMessage = `${quizId}와 일치하는 문제 정보가 없습니다.`;
                throw new RequestError(errorMessage, STATUS_404_NOTFOUND);
            }

            if (correctAnswer.answer === answer) {
                isCorrect = true;
                score += Number((1 / answers.length) * 100);
            }

            return { quizId, isCorrect };
        });
        return { result, score };
    }
}
