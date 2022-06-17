import { Router } from "express";
import wrapAsyncFunc from "@src/utils/catchAsync";
import { UserService } from "@src/service/user.service";
import { authRequired } from "@src/middlewares/authRequired";
import { bodyValidator } from "@src/middlewares/requestValidator";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";
import { userLoginSchema, userRegisterSchema, userUpdateSchema } from "@src/utils/bodySchema";

const userController = Router();

userController.get(
    "/users/current",
    authRequired,
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["user"]
            #swagger.description = "현재 유저 상태 조회"
            #swagger.responses[200] = {
            schema: { "$ref": "#/definitions/UserGetResponse" },
            description: "현재 유저 정보를 반환\n로그인중이 아니라면 **401** 상태코드" } */

        const { currentUserId } = req.cookies;
        const userInfo = await UserService.getByUser(currentUserId);
        res.status(STATUS_200_OK).json(userInfo);
    }),
);

userController.get(
    "/users/:id",
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["user"]
            #swagger.description = "한명의 유저 조회"
            #swagger.parameters['id'] = {
                in: 'path',
                description: '얻고자 하는 유저정보의 ID',
                required: true,
                schema: { $ref: "#/definitions/UserId" }
            }
            #swagger.responses[200] = {
            schema: { "$ref": "#/definitions/UserGetResponse" },
            description: "한명의 유저 정보를 반환" } */

        const { id } = req.params;
        const userInfo = await UserService.getByUser(id);
        res.status(STATUS_200_OK).json(userInfo);
    }),
);

userController.post(
    "/users/register",
    bodyValidator(userRegisterSchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["user"]
            #swagger.description = "유저 생성"
            #swagger.parameters['body'] = {
                in: 'body',
                description: '생성하고자 하는 유저의 정보를 body에 담아 요청\n
                    **email** 이메일 **필수**\n
                    **password** 비밀번호 **필수** 8자리 이상\n
                    **username** 닉네임 **필수** 3자리 이상
                ',
                required: true,
                schema: { $ref: "#/definitions/UserRequest" }
            }
            #swagger.responses[201] = {
            schema: { "$ref": "#/definitions/UserGetResponse" },
            description: "생성된 유저 정보 반환" } */

        const createdUser = await UserService.addUser(req.body);
        res.status(STATUS_201_CREATED).json(createdUser);
    }),
);

userController.post(
    "/users/login",
    bodyValidator(userLoginSchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["user"]
            #swagger.description = "유저 로그인"
            #swagger.parameters['body'] = {
                in: 'body',
                description: '유저 로그인 정보를 담아 요청\n
                    **email** 이메일 **필수**\n
                    **password** 비밀번호 **필수** 8자리 이상\n
                ',
                required: true,
                schema: { $ref: "#/definitions/UserLoginRequest" }
            }
            #swagger.responses[200] = {
            schema: { "$ref": "#/definitions/UserGetResponse" },
            description: "로그인 유저 정보 반환" } */

        const { user, accessToken, refreshToken } = await UserService.login(req.body);
        res.cookie("accessToken", accessToken);
        res.cookie("refreshToken", refreshToken);
        res.status(STATUS_200_OK).json(user);
    }),
);

userController.put(
    "/users/update",
    authRequired,
    bodyValidator(userUpdateSchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["user"]
            #swagger.description = "유저 수정"
            #swagger.parameters['body'] = {
                in: 'body',
                description: '수정하고자 하는 유저의 정보를 body에 담아 요청\n
                    **로그인 필수**\n
                    **email** 이메일 **필수** 변경 불가\n
                    **password** 비밀번호 **선택**\n
                    **username** 닉네임 **선택**
                ',
                required: true,
                schema: { $ref: "#/definitions/UserRequest" }
            }
            #swagger.responses[200] = {
            schema: { "$ref": "#/definitions/UserGetResponse" },
            description: "수정된 유저 정보 반환" } */

        const { currentUserId } = req.cookies;
        const updatedUser = await UserService.updateUser(currentUserId, req.body);
        res.status(STATUS_200_OK).json(updatedUser);
    }),
);

userController.delete(
    "/users/delete",
    authRequired,
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["user"]
            #swagger.description = "유저 삭제 **로그인 필수**"
            #swagger.responses[200] = {
            schema: { "$ref": "#/definitions/DeleteResponse" },
            description: "삭제 메시지" } */

        const { currentUserId } = req.cookies;
        const deleteResult = await UserService.deleteUser(currentUserId);
        res.status(STATUS_200_OK).json(deleteResult);
    }),
);

export default userController;
