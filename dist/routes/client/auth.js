"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../controller/authController"));
const router = express_1.default.Router();
router.get('/', authController_1.default.handleAuth);
module.exports = router;
//# sourceMappingURL=auth.js.map