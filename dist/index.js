"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const http = __importStar(require("http"));
const socketio = __importStar(require("socket.io"));
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
app.use((0, cookie_parser_1.default)());
//routes
const login_1 = __importDefault(require("./routes/login"));
const logout_1 = __importDefault(require("./routes/logout"));
const upload_1 = __importDefault(require("./routes/upload"));
const book_1 = __importDefault(require("./routes/api/book"));
const register_1 = __importDefault(require("./routes/register"));
const verifyAccessToken_1 = __importDefault(require("./middleware/verifyAccessToken"));
const refresh_1 = __importDefault(require("./routes/refresh"));
const auth_1 = __importDefault(require("./routes/auth"));
app.use('/register', register_1.default);
app.use('/login', login_1.default);
app.use('/auth', auth_1.default);
app.use('/refresh', refresh_1.default);
app.use('/logout', logout_1.default);
app.use(verifyAccessToken_1.default);
app.use('/upload', upload_1.default);
app.use('/books', book_1.default);
const server = http.createServer(app);
const io = new socketio.Server(server, {
    cors: {
        origin: "http://127.0.0.1:5173",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    socket.on("disconnect", () => {
        //console.log("user disconnected")
    });
    socket.on("order", (arg) => {
        console.log(arg);
    });
});
server.listen(4662, () => {
    console.log('server start on port : 4662');
});
//# sourceMappingURL=index.js.map