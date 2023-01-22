"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyRefreshToken = (req, res, next) => {
    const { token } = req.body;
    try {
        if (!token)
            return res.sendStatus(401);
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY_REFRESH, (err, decode) => {
            req.user = decode.user;
            req.role = decode.role;
            req.token = token;
        });
        next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
};
exports.default = verifyRefreshToken;
//# sourceMappingURL=verityRefreshToken.js.map