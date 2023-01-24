"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const logoutContorller_1 = __importDefault(require("../controller/logoutContorller"));
const router = express_1.default.Router();
router.get('/', logoutContorller_1.default.handleLogout);
module.exports = router;
//# sourceMappingURL=logout.js.map