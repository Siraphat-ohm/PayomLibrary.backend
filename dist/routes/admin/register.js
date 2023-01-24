"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const registerController_1 = __importDefault(require("../../controller/registerController"));
const router = express_1.default.Router();
router.post('/', registerController_1.default.handleRegister);
module.exports = router;
//# sourceMappingURL=register.js.map