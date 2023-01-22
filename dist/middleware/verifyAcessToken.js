"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAcessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY_ACESS, (err, decode) => {
            if (err) {
                res.sendStatus(403);
            }
            req.user = decode.user;
            req.role = decode.role;
            next();
        });
    }
    else {
        return res.sendStatus(403);
    }
};
exports.default = verifyAcessToken;
//# sourceMappingURL=verifyAcessToken.js.map