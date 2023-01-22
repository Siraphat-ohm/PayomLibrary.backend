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
const handleLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
        return res.status(204).json({ "message": "don't have cookies" }); // No content
    const refreshToken = cookies.jwt;
    const foundUser = yield User_1.User.find({ where: { refreshToken: refreshToken } });
    if (foundUser.length == 0) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: "none", secure: true });
        return res.sendStatus(204).json({ "message": "not found user" });
    }
    yield User_1.User.update({ refreshToken: refreshToken }, { refreshToken: "" });
    res.clearCookie('jwt', { httpOnly: true, sameSite: "none", secure: true });
    return res.status(204).json({ "message": "clear cookies" });
});
exports.default = { handleLogout };
//# sourceMappingURL=logoutContorller.js.map