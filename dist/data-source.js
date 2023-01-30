"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Author_1 = require("./entity/Author");
const Book_1 = require("./entity/Book");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("./entity/User");
const Language_1 = require("./entity/Language");
const Order_1 = require("./entity/Order");
const Reservation_1 = require("./entity/Reservation");
const Loan_1 = require("./entity/Loan");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    synchronize: true,
    logging: false,
    entities: [Book_1.Book, Author_1.Author, User_1.User, Language_1.Language, Order_1.Order, Reservation_1.Reservation, Loan_1.Loan],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map