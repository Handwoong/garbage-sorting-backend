import { Router } from "express";
import wrapAsyncFunc from "@src/utils/catchAsync";
import { STATUS_200_OK } from "@src/utils/statusCode";
import { BinsService } from "@src/service/bins.service";

const binsController = Router();

binsController.get(
    "/bins",
    wrapAsyncFunc(async (req, res, next) => {
        /*  #swagger.tags = ["bins"]
            #swagger.description = "조건에 따른 쓰레기통 위치정보 조회" 
            #swagger.parameters['queryString'] = {
                in: 'query',
                description: '자치구명, 도로명 조건에 따른 쓰레기통 위치목록 조회',
                required: true,
                schema: { $ref: "#/definitions/BinsQuery" }
            }    
            #swagger.responses[200] = { 
            schema: { "$ref": "#/definitions/BinsLocation" },
            description: "요청조건에 해당하는 쓰레기통 위치목록 조회" } */

        const binsLocation = await BinsService.getBinsLocation(req.query);
        return res.status(STATUS_200_OK).json(binsLocation);
    }),
);

binsController.get(
    "/bins/locations",
    wrapAsyncFunc(async (req, res, next) => {
        /*  #swagger.tags = ["bins"]
            #swagger.description = "자치구명, 도로명 리스트 조회" 
             
            #swagger.responses[200] = { 
            schema: { "$ref": "#/definitions/LocationList" },
            description: "유니크한 자치구명, 도로명 리스트 조회" } */

        const locationList = await BinsService.getLocationList();
        return res.status(STATUS_200_OK).json(locationList);
    }),
);

export default binsController;
