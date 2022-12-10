"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const uploadController_1 = __importDefault(require("../controller/uploadController"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: 'uploads' });
const router = express_1.default.Router();
router.post('/', upload.single('file'), uploadController_1.default.handleUpload);
module.exports = router;
//# sourceMappingURL=createBook.js.map