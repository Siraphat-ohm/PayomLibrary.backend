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
const bcrypt = require('bcrypt');
const handleRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { user, pwd } = req.body;
    try {
        let pwdHash = bcrypt.hashSync(pwd, 10);
        yield User_1.User.insert({ userName: user, passWord: pwdHash });
        res.sendStatus(200);
    }
    catch (error) {
        next(error);
    }
});
exports.default = { handleRegister };
//# sourceMappingURL=registerController.js.map