"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const data_source_1 = require("./data-source");
const cors_1 = __importDefault(require("cors"));
const credentials_1 = __importDefault(require("./middleware/credentials"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const session = require("express-session");
data_source_1.AppDataSource
    .initialize()
    .then(() => {
    console.log('initalized!');
})
    .catch((err) => {
    console.log("Error initalize", err);
});
const app = (0, express_1.default)();
//config
app.use(session({
    secret: "test",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));
app.use(express_1.default.json());
app.use(credentials_1.default);
app.use((0, cors_1.default)(corsOptions_1.default));
app.use((0, cookie_parser_1.default)());
//routes
const login_1 = __importDefault(require("./routes/login"));
const logout_1 = __importDefault(require("./routes/logout"));
const auth_1 = __importDefault(require("./routes/auth"));
const upload_1 = __importDefault(require("./routes/upload"));
const book_1 = __importDefault(require("./routes/api/book"));
app.use('/login', login_1.default);
app.use('/logout', logout_1.default);
app.use('/auth', auth_1.default);
app.use('/upload', upload_1.default);
app.use('/books', book_1.default);
app.listen(9999, () => {
    console.log("server start port : 9999");
});
//# sourceMappingURL=index.js.map