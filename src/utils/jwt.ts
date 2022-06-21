import jwt from "jsonwebtoken";

/* istanbul ignore next */
const secretKey = process.env.JWT_SECRET_KEY || "JWT_TOKEN";
/* istanbul ignore next */
const publicKey = process.env.JWT_PUBLIC_KEY || "JWT_TOKEN";

export const createAccessToken = (userId: string) => {
    return jwt.sign({ userId }, secretKey, {
        algorithm: "RS256",
        expiresIn: "1800s",
        issuer: "분리수ZIP",
    });
};

export const createRefreshToken = () => {
    return jwt.sign({}, secretKey, { algorithm: "RS256", expiresIn: "14d", issuer: "분리수ZIP" });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, publicKey);
    } catch (error: any) {
        return error;
    }
};
