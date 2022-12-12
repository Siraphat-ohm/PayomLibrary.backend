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
    const { title, category_id, copies_owned, publication_year, edition } = req.body;
    const file = fs_1.default.readFileSync("./uploads/" + req.file.filename);
    try {
        yield Book_1.Book.insert({
            title: title,
            category_id: category_id,
            copies_owned: copies_owned,
            publication_year: publication_year,
            edition: edition,
            graphic: file
        });
        fs_1.default.unlinkSync("./uploads/" + req.file.filename);
        res.json({ "message": "create success" });
    }
    catch (error) {
        console.error(error.message);
        res.sendStatus(400);
    }
});
exports.default = { handleUpload };
//# sourceMappingURL=uploadController.js.map