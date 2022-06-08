import * as fs from "fs";
import mongoose from "mongoose";
import { styrofoam } from "./styrofoamSeed"
import { can } from "./canSeed"
import { glass } from "./glassSeed"
import { plastic } from "./plasticSeed"

const DB_URL =
    process.env.MONGODB_URL ||
    "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () => {
    console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)

    const session = await mongoose.startSession();

    await session.withTransaction(async () => {
        try {
            // 모아서 하나의 배열 안에 객체 데이터 모두 넣기


            categoryArr.forEach((categoryName) => {
                const dataBuffer = fs.readFileSync(
                    `/Users/yanghaechan/vscode_workspace/elice_project/data-project/sample-project/back/product-data/${categoryName}.json`,
                );
                const originData = JSON.parse(dataBuffer.toString());
                originData.forEach(async (product) => {
                    const data = {
                        productId: product.article_id,
                        name: product.prod_name,
                        category: product.product_type_name,
                        price: product.price,
                        color: product.colour_group_name,
                        description: product.detail_desc,
                        image:
                            "https://data-project-12-team.s3.ap-northeast-2.amazonaws.com/codingSoon/" +
                            product.article_id +
                            ".jpg",
                        likeCount: 0,
                        bestPreferAge: product.age_id,
                        gender: product.index_group_name,
                    };

                    await ProductModel.create([data], { session });
                });

                console.log(`${categoryName} 데이터를 정상적으로 저장했습니다.`);
            });
        } catch (error) {
            console.log(error);
            throw new Error(error);
        } finally {
            session.endSession();
        }
    });

});
db.on("error", (error) =>
    console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error),
);
