"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleUpload = (req, res, next) => {
    console.log(req.file);
    res.send(req.file);
};
exports.default = { handleUpload };
//# sourceMappingURL=uploadController.js.map