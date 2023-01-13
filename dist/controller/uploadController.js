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
const Author_1 = require("../entity/Author");
const Book_1 = require("../entity/Book");
const Book_author_1 = require("../entity/Book_author");
const handleUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, category, author, edition, publication_year, page, language, detail, amount, ISBN } = req.body;
    try {
        let allAuthor = yield Author_1.Author.find({ select: { name: true } });
        const arrAuthor = allAuthor.map(item => item.name);
        if (!(arrAuthor.includes(author))) {
            yield Author_1.Author.insert({
                name: author
            });
        }
        yield Book_1.Book.insert({
            title: title,
            category_id: category,
            edition: edition,
            publication_year: publication_year,
            page: page,
            language: language,
            detail: detail,
            copies_owned: amount,
            ISBN: ISBN,
            graphic: req.file.filename
        });
        const author_id = yield Author_1.Author.find({ select: { author_id: true }, where: { name: author } });
        const book_id = yield Book_1.Book.find({ select: { id: true }, where: { title: title } });
        yield Book_author_1.Book_author.insert({
            book_id: Number(book_id),
            author_id: Number(author_id)
        });
        res.sendStatus(200);
    }
    catch (error) {
        console.error(error.message);
        res.sendStatus(400);
    }
});
exports.default = { handleUpload };
//# sourceMappingURL=uploadController.js.map