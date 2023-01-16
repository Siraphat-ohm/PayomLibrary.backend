"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAcessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAcessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY_ACESS, { expiresIn: '15s' });
};
exports.generateAcessToken = generateAcessToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY_REFRESH);
};
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=tokenManager.js.map