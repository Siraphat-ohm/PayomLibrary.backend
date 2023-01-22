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
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entity/User");
const handleAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookie = req.cookies;
    if (JSON.stringify(cookie) == '{}')
        return res.json({ "isLogin": false });
    try {
        const foundRefresh = yield User_1.User.find({ where: { refreshToken: cookie.jwt } });
        res.json({ "isLogin": true, "user": foundRefresh[0].userName });
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = { handleAuth };
//# sourceMappingURL=authController.js.map