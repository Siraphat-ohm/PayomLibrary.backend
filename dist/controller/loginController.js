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
const handleLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let session;
    let { user, pwd } = req.body;
    try {
        let foundUser = yield User_1.User.find({
            where: { userName: req.body.user }
        });
        if (foundUser[0].userName == user && (yield bcrypt.compareSync(pwd, foundUser[0].passWord))) {
            session = req.session;
            session.userid = foundUser[0].id;
            session.username = foundUser[0].userName;
            res.status(200).json({ "message": "login success." });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = { handleLogin };
//# sourceMappingURL=loginController.js.map