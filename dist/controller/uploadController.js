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
const handleUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, category, author, edition, publication_year, language, detail, amount, ISBN, page } = req.body;
    const [fname, lname] = author.split(" ");
    try {
        const author = new Author_1.Author();
        author.fname = fname;
        author.lname = lname;
        yield Author_1.Author.save(author);
        const book = new Book_1.Book();
        book.title = title;
        book.authors = [author];
        book.categoryId = category;
        book.edition = edition;
        book.pubYear = publication_year;
        book.language = language;
        book.copies = amount;
        book.description = detail;
        book.ISBN = ISBN;
        book.page = page;
        book.graphic = req.file.filename;
        yield Book_1.Book.save(book);
        res.sendStatus(200);
    }
    catch (error) {
        console.error(error.message);
        res.sendStatus(400);
    }
});
exports.default = { handleUpload };
//# sourceMappingURL=uploadController.js.map