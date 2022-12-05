"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleAuth = (req, res, next) => {
    console.log(req.session);
    if (req.session.username != undefined) {
        res.status(200).json({ "username": req.session.username });
    }
    else {
        res.sendStatus(204);
    }
};
exports.default = { handleAuth };
//# sourceMappingURL=authController.js.map