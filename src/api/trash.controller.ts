import multer from "multer";
import { Router } from "express";
import { TrashService } from "@src/service";
import { ITrash } from "@src/models/interface";
import { storage } from "@src/utils/fileUpload";
import wrapAsyncFunc from "@src/utils/catchAsync";
import { trashSchema } from "@src/utils/bodySchema";
import { trashCategories } from "@src/utils/constants";
import { identifierSchema } from "@src/utils/paramsSchema";
import { RequestError } from "@src/middlewares/errorHandler";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";
import { bodyValidator, paramsValidator } from "@src/middlewares/requestValidator";

const upload = multer({ storage });
const trashController = Router();

trashController.get(
    "/trash",
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["trash"]
            #swagger.description = "쓰레기 목록 조회"
            #swagger.parameters['queryString'] = {
                in: 'query',
                description: '**search** 검색어\n
                **category** 조회할 카테고리\n
                **page** 첫 요청시 빈 문자열 또는 생략\n
                **limit** 기본값10\n',
                required: false,
                schema: { $ref: "#/definitions/TrashGetQuery" }
            }
            #swagger.responses[200] = {
            schema: { "$ref": "#/definitions/TrashGetResponse" },
            description: "쓰레기 목록을 배열형태로 반환" } */

        const trashList = await TrashService.getTrashList(req.query);
        res.status(STATUS_200_OK).json(trashList);
    }),
);

trashController.get(
    "/trash/categories",
    wrapAsyncFunc(async (_req, res, _next) => {
        /*  #swagger.tags = ["trash"]
            #swagger.description = "쓰레기 카테고리 조회"
            #swagger.responses[200] = {
            schema: { "$ref": "#/definitions/TrashCategoryGetResponse" },
            description: "쓰레기 카테고리 목록을 배열형태로 반환" } */

        res.status(STATUS_200_OK).json(trashCategories);
    }),
);

trashController.get(
    "/trash/:id",
    paramsValidator(identifierSchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["trash"]
            #swagger.description = "개별 쓰레기 정보 조회"
            #swagger.parameters['id'] = {
                in: 'path',
                description: '얻고자 하는 쓰레기정보의 ID',
                required: true,
                schema: { $ref: "#/definitions/TrashId" }
            }
            #swagger.responses[200] = {
            schema: { "$ref": "#/definitions/TrashOneGetResponse" },
            description: "쓰레기 정보를 반환" } */

        const { id } = req.params;
        const trashInfo = await TrashService.getByTrash(id);
        res.status(STATUS_200_OK).json(trashInfo);
    }),
);

trashController.post(
    "/trash",
    bodyValidator(trashSchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["trash"]
            #swagger.description = "쓰레기 생성"
            #swagger.parameters['body'] = {
                in: 'body',
                description: '생성하고자 하는 쓰레기의 정보를 body에 담아 요청',
                required: true,
                schema: { $ref: "#/definitions/TrashPostRequest" }
            }
            #swagger.responses[201] = { 
            schema: { "$ref": "#/definitions/TrashPostResponse" },
            description: "생성된 쓰레기 정보 반환" } */

        const trashInfo: ITrash = req.body;
        const createdTrash = await TrashService.addTrash(trashInfo);
        res.status(STATUS_201_CREATED).json(createdTrash);
    }),
);

trashController.post(
    "/trash/ai",
    upload.single("aiImage"),
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["trash"]
            #swagger.description = "쓰레기 AI 분석"
            #swagger.consumes = ['multipart/form-data']
            #swagger.parameters['multFiles'] = {
                in: 'formData',
                type: 'single',
                required: true,
                description: '쓰레기 이미지 파일\nmultipart/form-data',
                collectionFormat: 'multi',
                items: { type: 'file' }
            }
            #swagger.responses[200] = {
            schema: { "$ref": "#/definitions/TrashAiResponse" },
            description: "AI 분석결과를 반환 분석 결과가 없다면 { message: '메시지 반환'}" } */

        if (!req.file) throw new RequestError();
        const aiTrashResult = await TrashService.aiTrash(req.file.path);
        res.status(STATUS_200_OK).json(aiTrashResult);
    }),
);

trashController.put(
    "/trash/:id",
    paramsValidator(identifierSchema),
    bodyValidator(trashSchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["trash"]
            #swagger.description = "쓰레기 정보 수정"
            #swagger.parameters['id'] = {
                in: 'path',
                description: '수정하고자 하는 쓰레기의 ID',
                required: true,
                schema: { $ref: "#/definitions/TrashId" }
            }
            #swagger.parameters['body'] = {
                in: 'body',
                description: '수정하고자 하는 쓰레기의 정보를 body에 담아 요청',
                required: true,
                schema: { $ref: "#/definitions/TrashPutRequest" }
            }
            #swagger.responses[200] = { 
            schema: { "$ref": "#/definitions/TrashPutResponse" },
            description: "수정된 쓰레기 정보 반환" } */

        const { id } = req.params;
        const trashInfo: ITrash = req.body;
        const updatedTrash = await TrashService.updateTrash(id, trashInfo);
        res.status(STATUS_200_OK).json(updatedTrash);
    }),
);

trashController.delete(
    "/trash/:id",
    paramsValidator(identifierSchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["trash"]
            #swagger.description = "쓰레기 삭제"
            #swagger.parameters['id'] = {
                in: 'path',
                description: '삭제하고자 하는 쓰레기의 ID',
                required: true,
                schema: { $ref: "#/definitions/TrashId" }
            }
            #swagger.responses[200] = { 
            schema: { "$ref": "#/definitions/DeleteResponse" },
            description: "삭제 메시지" } */

        const { id } = req.params;
        const deleteResult = await TrashService.deleteTrash(id);
        res.status(STATUS_200_OK).json(deleteResult);
    }),
);

export default trashController;
