"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenManager_1 = __importDefault(require("../token/tokenManager"));
const handleRefresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = { user: req.user, role: req.role };
        const TKM = new tokenManager_1.default(payload);
        const accessToken = TKM.generateAcessToken();
        const refreshToken = TKM.generateRefreshToken();
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
    }
    catch (error) {
        res.sendStatus(404);
    }
});
exports.default = { handleRefresh };
//# sourceMappingURL=refreshController.js.map