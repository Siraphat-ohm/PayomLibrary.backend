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
const roles_json_1 = __importDefault(require("../config/roles.json"));
const bcrypt = require('bcrypt');
const handleLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { user, pwd } = req.body;
    try {
        let foundUser = yield User_1.User.find({
            where: { userName: req.body.user }
        });
        const userInput = foundUser[0].userName;
        const pwdInput = foundUser[0].passWord;
        const role = roles_json_1.default[foundUser[0].role];
        const payload = { user: userInput, role: role };
        if (userInput == user && (yield bcrypt.compareSync(pwd, pwdInput))) {
            //req.session.userid = foundUser[0].id;
            //req.session.username = foundUser[0].userName;
            //res.status(200).json({"message":"login success."});
            const accessToken = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY_ACESS);
            res.json({ accessToken: accessToken });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = { handleLogin };
//# sourceMappingURL=loginController.js.map