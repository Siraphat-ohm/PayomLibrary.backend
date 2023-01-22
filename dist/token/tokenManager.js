"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenManager {
    constructor(payload) {
        this.payload = payload;
    }
    generateAcessToken() {
        this.accessToken = jsonwebtoken_1.default.sign(this.payload, process.env.SECRET_KEY_ACESS, { expiresIn: "3m" });
        return this.accessToken;
    }
    generateRefreshToken() {
        this.refreshToken = jsonwebtoken_1.default.sign(this.payload, process.env.SECRET_KEY_REFRESH, { expiresIn: "1d" });
        return this.refreshToken;
    }
}
exports.default = TokenManager;
//# sourceMappingURL=tokenManager.js.map