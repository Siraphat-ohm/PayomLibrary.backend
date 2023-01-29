"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Author_1 = require("./entity/Author");
const Book_1 = require("./entity/Book");
const Book_author_1 = require("./entity/Book_author");
const Category_1 = require("./entity/Category");
const Loan_1 = require("./entity/Loan");
const Member_status_1 = require("./entity/Member_status");
const Reservation_1 = require("./entity/Reservation");
const Reservation_status_1 = require("./entity/Reservation_status");
const User_1 = require("./entity/User");
const Order_1 = require("./entity/Order");
const dotenv_1 = __importDefault(require("dotenv"));
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
    entities: [User_1.User, Book_1.Book, Book_author_1.Book_author, Author_1.Author, Category_1.Category, Loan_1.Loan, Member_status_1.Member_status, Reservation_1.Reservation, Reservation_status_1.Reservation_status, Order_1.Order],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map