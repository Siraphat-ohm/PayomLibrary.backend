"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.role)
            return res.sendStatus(401);
        const roleArray = [...allowedRoles];
        const result = roleArray.find(item => item == req.role);
        if (!result)
            return res.sendStatus(401);
        next();
    };
};
exports.default = verifyRoles;
//# sourceMappingURL=verifyRole.js.map