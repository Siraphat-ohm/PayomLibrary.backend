"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleLogout = (req, res, next) => {
    req.session.destroy((err) => { }); //destroy session .
    res.json({ "session": req.session });
};
exports.default = { handleLogout };
//# sourceMappingURL=logoutContorller.js.map