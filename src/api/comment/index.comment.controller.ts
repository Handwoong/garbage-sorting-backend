import { Router } from "express";
import wrapAsyncFunc from "@src/utils/catchAsync";
import { commentSchema } from "@src/utils/bodySchema";
import { authRequired } from "@src/middlewares/authRequired";
import { CommentService } from "@src/service/comment.service";
import { STATUS_200_OK, STATUS_201_CREATED } from "@src/utils/statusCode";
import { identifierSchema, postIdentifierSchema } from "@src/utils/paramsSchema";
import { bodyValidator, paramsValidator } from "@src/middlewares/requestValidator";

const commentController = Router();

commentController.post(
    "/comments/:postId",
    authRequired,
    paramsValidator(postIdentifierSchema),
    bodyValidator(commentSchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["comment"]
            #swagger.description = "댓글 생성 **로그인 필수**"
            #swagger.parameters['postId'] = {
                in: 'path',
                description: '댓글을 달 게시글의 ID',
                required: true,
                schema: { $ref: "#/definitions/PostId" }
            }
            #swagger.parameters['body'] = {
                in: 'body',
                description: '생성하고자 하는 댓글의 정보를 body에 담아 요청',
                required: true,
                schema: { $ref: "#/definitions/CommentCreateRequest" }
            }
            #swagger.responses[201] = {
            schema: { "$ref": "#/definitions/CommentCreateResponse" },
            description: "생성된 댓글 정보 반환" } */

        const { postId } = req.params;
        const { currentUserId } = req.cookies;
        const createdComment = await CommentService.addComment(currentUserId, postId, req.body);
        res.status(STATUS_201_CREATED).json(createdComment);
    }),
);

commentController.put(
    "/comments/:id",
    authRequired,
    paramsValidator(identifierSchema),
    bodyValidator(commentSchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["comment"]
            #swagger.description = "댓글 정보 수정 **로그인 필수**"
            #swagger.parameters['id'] = {
                in: 'path',
                description: '수정하고자 하는 댓글의 ID',
                required: true,
                schema: { $ref: "#/definitions/CommentId" }
            }
            #swagger.parameters['body'] = {
                in: 'body',
                description: '수정하고자 하는 댓글의 정보를 body에 담아 요청',
                required: true,
                schema: { $ref: "#/definitions/CommentPutRequest" }
            }
            #swagger.responses[200] = {
            schema: { "$ref": "#/definitions/CommentPutResponse" },
            description: "수정된 댓글 정보 반환" } */

        const { id } = req.params;
        const updatedComment = await CommentService.updateComment(id, req.body);
        res.status(STATUS_200_OK).json(updatedComment);
    }),
);

commentController.delete(
    "/comments/:id/posts/:postId",
    authRequired,
    paramsValidator(identifierSchema),
    wrapAsyncFunc(async (req, res, _next) => {
        /*  #swagger.tags = ["comment"]
            #swagger.description = "댓글 삭제 **로그인 필수**"
            #swagger.parameters['id'] = {
                in: 'path',
                description: '삭제하고자 하는 댓글의 ID',
                required: true,
                schema: { $ref: "#/definitions/CommentId" }
            }
            #swagger.parameters['postId'] = {
                in: 'path',
                description: '삭제하고자 하는 댓글이 달려있는 게시글 ID',
                required: true,
                schema: { $ref: "#/definitions/PostId" }
            }
            #swagger.responses[200] = {
            schema: { "$ref": "#/definitions/DeleteResponse" },
            description: "삭제 메시지" } */

        const { id, postId } = req.params;
        const deletedComment = await CommentService.deleteComment(id, postId);
        res.status(STATUS_200_OK).json(deletedComment);
    }),
);

export default commentController;
