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
const bcrypt = require('bcrypt');
const tokenManager_1 = __importDefault(require("../token/tokenManager"));
const handleLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { user, pwd } = req.body;
    if (!user || !pwd)
        return res.json({ 'message': "Username and password are required." }).status(400);
    try {
        let foundUser = yield User_1.User.find({ where: { userName: req.body.user } });
        if (!foundUser)
            return res.status(401).json({ "message": "not found user in database." });
        const userInput = foundUser[0].userName;
        const pwdInput = foundUser[0].passWord;
        const role = foundUser[0].role;
        const payload = { user: userInput, role: role };
        const TKM = new tokenManager_1.default(payload);
        if (userInput == user && (yield bcrypt.compareSync(pwd, pwdInput))) {
            const accessToken = TKM.generateAcessToken();
            const refreshToken = TKM.generateRefreshToken();
            yield User_1.User.update({ userName: user }, { refreshToken: refreshToken });
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken: accessToken, auth: true });
        }
        else {
            res.json({ "massage": "user or password invalid" }).status(401);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = { handleLogin };
//# sourceMappingURL=loginController.js.map