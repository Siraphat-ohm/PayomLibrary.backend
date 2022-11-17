"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const loginController_1 = __importDefault(require("../controller/loginController"));
const router = express_1.default.Router();
router.post('/', loginController_1.default.handleLogin);
module.exports = router;
//# sourceMappingURL=login.js.map