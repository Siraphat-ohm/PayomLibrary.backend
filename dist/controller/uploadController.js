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
const Book_1 = require("../entity/Book");
const fs_1 = __importDefault(require("fs"));
const handleUpload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let obj = {
        id: req.body.id,
        title: req.body.title,
        category_id: req.body.category_id,
        publication_date: req.body.publication_date,
        copies_own: req.body.copies_own,
        graphic: req.files || req.file
    };
    const file = fs_1.default.readFileSync("./uploads/" + req.file.filename);
    try {
        yield Book_1.Book.insert({
            title: req.body.title,
            category_id: req.body.category_id,
            publication_date: req.body.publication_date,
            copies_owned: req.body.copies_owned,
            graphic: file
        });
        res.send(req.file.filename);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(400);
        next(error);
    }
});
exports.default = { handleUpload };
//# sourceMappingURL=uploadController.js.map