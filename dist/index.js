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
const register_1 = __importDefault(require("./routes/admin/register"));
const login_1 = __importDefault(require("./routes/login"));
const logout_1 = __importDefault(require("./routes/logout"));
const auth_1 = __importDefault(require("./routes/auth"));
const refresh_1 = __importDefault(require("./routes/refresh"));
const upload_1 = __importDefault(require("./routes/admin/upload"));
const book_1 = __importDefault(require("./routes/client/api/book"));
const order_1 = __importDefault(require("./routes/admin/order"));
const Book_1 = require("./entity/Book");
const Author_1 = require("./entity/Author");
const verifyAccessToken_1 = __importDefault(require("./middleware/verifyAccessToken"));
const Order_1 = require("./entity/Order");
const typeorm_1 = require("typeorm");
app.use('/api/refresh', refresh_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/register', register_1.default);
app.use('/api/login', login_1.default);
app.use('/api/logout', logout_1.default);
app.use('/api/system-login', login_1.default);
app.use(verifyAccessToken_1.default);
app.use('/api/upload', upload_1.default);
app.use('/api/books', book_1.default);
app.use('/api/getOrder', order_1.default);
app.get("/book", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Book_1.Book.find({ relations: { authors: true } });
    const author = yield Author_1.Author.find();
    res.json({ data, author }).status(200);
}));
const server = http.createServer(app);
const io = new socketio.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    socket.on("order", (arg) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const books = [];
            for (let order of arg) {
                try {
                    const book = yield Book_1.Book.findOneOrFail({ where: { copies: (0, typeorm_1.MoreThanOrEqual)(order.amount), id: order.id } });
                    books.push(book);
                }
                catch (error) {
                    console.log("fuck");
                    return;
                }
            }
            const order = new Order_1.Order();
            order.bookOrders = books;
            order.userId = arg[0].userId;
            yield Order_1.Order.save(order);
            const orders = yield Order_1.Order.find({ relations: { bookOrders: true } });
            console.log(orders);
            socket.emit("send-order", orders);
            // for ( let book of books ) {
            // try {
            // const bookUpdate = new BookOrder();
            // bookUpdate.ISBN = book.ISBN;
            // bookUpdate.amount = 1;
            // bookUpdate.title = book.title;
            // bookUpdate.bookId = book.id
            // await BookOrder.save(bookUpdate);
            // book.copies--;
            // await book.save()
            // console.log('yay');
            // } catch (error) {
            // console.log(error);
            // }
            // }
        }
        catch (error) {
            console.log(error);
        }
    }));
});
server.listen(4662, () => {
    console.log('server start on port : 4662');
});
//# sourceMappingURL=index.js.map