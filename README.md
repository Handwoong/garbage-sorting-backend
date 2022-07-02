# BackEnd

## 프로젝트 소개

- `프로젝트 주제 : AI 기반 쓰레기 분류 서비스`<br/>
- 객체인식AI, 퀴즈, 게임 등 다양한 컨텐츠를 통해 헷갈리는 쓰레기별 분리배출 정보를 제공하는 서비스입니다.

## 주요 개발 스택

```
Node.js
Express
TypeScript

MongoDB(mongodb Cloud)
Mongoose

Joi
Swagger

Jest
Prettier
Eslint
```

## 실행방법

- 서비스 테스트를 수행하려면 MongoDB가 설치되어 있어야 합니다.

### `Local 환경에서 실행하기`

```bash
yarn # install packages

yarn dev # start server in dev environment

yarn test # start test with jest
```

### `Docker 환경에서 실행하기`

```bash
yarn build # TypeScript complied with tsc

docker build . -t <image_name> # build docker image

docker run --name <container_name> -d -p <port>:<port_in_docker> <image_name> # run docker container with docker image
```

## 환경설정 정보

```
MONGODB_URL                 # 데이터베이스 URL
PORT                        # 서버 실행 포트
JWT_SECRET_KEY              # JWT PRIVATE KEY
JWT_PUBLIC_KEY              # JWT PUBLIC KEY
CLOUDINARY_NAME             # Storage 이름
CLOUDINARY_API_KEY          # Storage API KEY
CLOUDINARY_SECRET_KEY       # Stoaged SECRET KEY
AI_SERVER_URL               # AI SERVER URL
```

## 주요 기능 개발

[`기능 구현 목록 - ChangeLog`](https://github.com/Handwoong/garbage-sorting-backend/wiki/ChangeLog)

## 기타 프로젝트 자료(링크)

[`DataBase ERD`](https://github.com/Handwoong/garbage-sorting-backend/wiki/ERD-Image) <br/>
[`Project Architecture`](https://github.com/Handwoong/garbage-sorting-backend/wiki/Project-Architecture)
