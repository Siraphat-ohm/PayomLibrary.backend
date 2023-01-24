"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const bookController_1 = __importDefault(require("../../../controller/bookController"));
const verifyRole_1 = __importDefault(require("../../../middleware/verifyRole"));
const roles_json_1 = __importDefault(require("../../../config/roles.json"));
const router = express_1.default.Router();
router.route('/').get((0, verifyRole_1.default)(roles_json_1.default.student), bookController_1.default.getAllBooks);
router.route('/pages').get((0, verifyRole_1.default)(roles_json_1.default.student), bookController_1.default.getNumberOfPages);
router.route('/:page').get((0, verifyRole_1.default)(roles_json_1.default.student), bookController_1.default.paginationBooks);
module.exports = router;
//# sourceMappingURL=book.js.map