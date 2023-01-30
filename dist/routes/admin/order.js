"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const verifyRole_1 = __importDefault(require("../../middleware/verifyRole"));
const roles_json_1 = __importDefault(require("../../config/roles.json"));
const orderController_1 = __importDefault(require("../../controller/orderController"));
const router = express_1.default.Router();
router.route('/').get((0, verifyRole_1.default)(roles_json_1.default.libralian), orderController_1.default.handleOrder);
module.exports = router;
//# sourceMappingURL=order.js.map