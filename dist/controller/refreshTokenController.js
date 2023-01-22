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
const User_1 = require("../entity/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenManager_1 = __importDefault(require("../token/tokenManager"));
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    try {
        const foundUser = yield User_1.User.find({ where: { userName: req.user } });
        if (foundUser.length == 0)
            return res.sendStatus(403);
        const TKM = new tokenManager_1.default({ user: foundUser[0].userName, role: foundUser[0].role });
        jsonwebtoken_1.default.verify(refreshToken, process.env.SECRET_KEY_REFRESH, (err, decode) => {
            if (err)
                return res.sendStatus(403);
            const accessToken = TKM.generateAcessToken();
            res.json({ accessToken: accessToken }).status(200);
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = { handleRefreshToken };
//# sourceMappingURL=refreshTokenController.js.map