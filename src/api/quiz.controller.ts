import { Router } from "express";
import { QuizService } from "@src/service";
import wrapAsyncFunc from "@src/utils/catchAsync";
import { Submissions } from "@src/models/interface";
import { MINIGAME_STEP } from "@src/utils/constants";
import { STATUS_200_OK } from "@src/utils/statusCode";
import { quizSchema, quizSetSchema } from "@src/utils/bodySchema";
import { gameStepSchema, identifierSchema } from "@src/utils/paramsSchema";
import { bodyValidator, paramsValidator } from "@src/middlewares/requestValidator";

const quizController = Router();

quizController.get(
    "/quizzes",
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["quiz"]
            #swagger.description = "타입별 퀴즈목록 조회" 
            #swagger.parameters['queryString'] = {
                in: 'query',
                description: '[multipleChoice, mixUp, ox] 3가지 타입 중 한가지로 요청',
                required: true,
                schema: { $ref: "#/definitions/QuizType" }
            }    
            #swagger.responses[200] = { 
            schema: { "$ref": "#/definitions/QuizByType" },
            description: "요청타입에 해당하는 퀴즈목록 조회" } */

        const quizType = req.query.type as string;
        const quizList = await QuizService.getQuizList(quizType);
        return res.status(STATUS_200_OK).json(quizList);
    }),
);

quizController.get(
    "/quizzes/wrong",
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["quiz"]
            #swagger.description = "오답률 상위 3개 퀴즈정보 조회" 
            
            #swagger.responses[200] = { 
            schema: { "$ref": "#/definitions/QuizByType" },
            description: "오답률 상위 3개 퀴즈정보 리턴" } */

        const quizzesByWrongRate = await QuizService.getQuizByWrongRate();
        return res.status(STATUS_200_OK).json(quizzesByWrongRate);
    }),
);

quizController.get(
    "/quizzes/game/:step",
    paramsValidator(gameStepSchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["quiz"]
            #swagger.description = "미니게임 쓰레기 이미지 조회"
            #swagger.parameters['step'] = {
                in: 'path',
                description: '미니게임 단계를 0, 1, 2 중에서 요청',
                required: true,
                schema: { $ref: "#/definitions/QuizStep" }
            }
            #swagger.responses[200] = {
            schema: { "$ref": "#/definitions/QuizGameImgSet" },
            description: "단계별 미니게임에 필요한 쓰레기 이미지를 반환" } */

        const { step } = req.params;
        res.status(STATUS_200_OK).json(MINIGAME_STEP[+step]);
    }),
);

quizController.get(
    "/quizzes/:id",
    paramsValidator(identifierSchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["quiz"]
            #swagger.description = "quizId에 해당하는 퀴즈정보 조회" 
            #swagger.parameters['id'] = {
                in: 'path',
                description: '조회하고자 하는 퀴즈의 quizId를 경로 엔드포인트에 추가',
                required: true,
                schema: { $ref: "#/definitions/QuizId" }
            }
            
            #swagger.responses[200] = { 
            schema: { "$ref": "#/definitions/QuizByType" },
            description: "quizId에 해당하는 퀴즈정보 조회" } */

        const { id } = req.params;
        const quiz = await QuizService.getQuiz(id);
        return res.status(STATUS_200_OK).json(quiz);
    }),
);

quizController.post(
    "/quizzes/:id/submission",
    paramsValidator(identifierSchema),
    bodyValidator(quizSchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["quiz"]
            #swagger.description = "quizId에 해당하는 퀴즈채점" 
            #swagger.parameters['id'] = {
                in: 'path',
                description: '채점하고자 하는 퀴즈의 quizId를 경로 엔드포인트에 추가',
                required: true,
                schema: { $ref: "#/definitions/QuizId" }
            }
            #swagger.parameters['answer'] = {
                in: 'body',
                description: '해당 퀴즈를 풀이한 유저의 답을 body에 담아 요청',
                required: true,
                schema: { $ref: "#/definitions/QuizUserAnswer" }
            }

            #swagger.responses[200] = { 
            schema: { "$ref": "#/definitions/QuizResult" },
            description: "quizId에 해당하는 퀴즈 채점결과 반환" } */

        const { id } = req.params;
        const answer: string = req.body.answer;
        const result = await QuizService.getQuizResult(id, answer);
        return res.status(STATUS_200_OK).json(result);
    }),
);

quizController.post(
    "/quizzes/submission",
    bodyValidator(quizSetSchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["quiz"]
            #swagger.description = "퀴즈셋 채점" 
            #swagger.parameters['퀴즈셋정보'] = {
                in: 'body',
                description: '채점하고자 하는 퀴즈셋의 정보를 body에 담아 요청',
                required: true,
                schema: { $ref: "#/definitions/QuizSetSubmission" }
            }    

            #swagger.responses[200] = { 
            schema: { "$ref": "#/definitions/QuizSetResult" },
            description: "퀴즈셋 채점결과 반환" } */

        const { type, answers }: Submissions = req.body;
        const result = await QuizService.getQuizSetResults({ type, answers });
        return res.status(STATUS_200_OK).json(result);
    }),
);

export default quizController;
