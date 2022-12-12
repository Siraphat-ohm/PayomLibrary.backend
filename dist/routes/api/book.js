"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const bookController_1 = __importDefault(require("../../controller/bookController"));
const router = express_1.default.Router();
router.get('/', bookController_1.default.getAllBooks);
module.exports = router;
//# sourceMappingURL=book.js.map