"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whitelist_json_1 = __importDefault(require("../config/whitelist.json"));
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (whitelist_json_1.default['allow'].includes(origin)) {
        res.setHeader('Access-Control-Allow-Credentials', true);
    }
    next();
};
exports.default = credentials;
//# sourceMappingURL=credentials.js.map