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
const Book_1 = require("../entity/Book");
const fs = require('fs');
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield Book_1.Book.find();
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
});
const paginationBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let page = req.params.page || 1;
    const size = 10;
    const calSkip = (page, size) => {
        return (page - 1) * size;
    };
    try {
        let data = yield Book_1.Book.find({
            skip: (calSkip(Number(page), size)),
            take: size
        });
        const filename = fs.readdirSync('./uploads/');
        data.forEach((element, index) => {
            data[index].graphic = fs.readFileSync(`./uploads/${filename.find(item => data[index].graphic == item)}`, { encoding: 'base64' });
        });
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});
const getNumberOfPages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const calPage = (count, size) => {
        return Math.ceil(count / size);
    };
    try {
        let count = yield Book_1.Book.count({ select: ['id'] });
        res.status(200).json({ "pages": calPage(Number(count), 10) });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});
exports.default = { getAllBooks, paginationBooks, getNumberOfPages };
//# sourceMappingURL=bookController.js.map