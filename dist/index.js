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
const express_1 = __importDefault(require("express"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const data_source_1 = require("./data-source");
const User_1 = require("./entity/User");
const cors_1 = __importDefault(require("cors"));
const credentials_1 = __importDefault(require("./middleware/credentials"));
const bcrypt_1 = __importDefault(require("bcrypt"));
data_source_1.AppDataSource
    .initialize()
    .then(() => {
    console.log('initalized!');
})
    .catch((err) => {
    console.log("Error initalize", err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(credentials_1.default);
app.use((0, cors_1.default)(corsOptions_1.default));
app.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { user, pwd } = req.body;
    try {
        let foundUser = yield User_1.User.find({
            where: { userName: req.body.user }
        });
        if (foundUser[0].userName == req.body.user && (yield bcrypt_1.default.compareSync(pwd, foundUser[0].passWord)))
            res.status(200).json({ "message": "login success" });
    }
    catch (error) {
        next(error);
    }
}));
app.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { user, pwd } = req.body;
    try {
        let pwdHash = bcrypt_1.default.hashSync(pwd, 10);
        console.log(pwdHash);
        yield User_1.User.insert({ userName: user, passWord: pwdHash });
        res.sendStatus(200);
    }
    catch (error) {
        next(error);
    }
}));
app.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ "message": "api is ok." });
}));
app.listen(9999, () => {
    console.log("server start port : 9999");
});
//# sourceMappingURL=index.js.map