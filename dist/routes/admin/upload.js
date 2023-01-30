"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const uploadController_1 = __importDefault(require("../../controller/uploadController"));
const multer_1 = __importDefault(require("multer"));
const verifyRole_1 = __importDefault(require("../../middleware/verifyRole"));
const roles_json_1 = __importDefault(require("../../config/roles.json"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const router = express_1.default.Router();
router.post('/', upload.single('graphic'), (0, verifyRole_1.default)(roles_json_1.default.libralian), uploadController_1.default.handleUpload);
module.exports = router;
//# sourceMappingURL=upload.js.map