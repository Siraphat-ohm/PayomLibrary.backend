import { Request, Response } from "express"

const verifyRoles = (...allowedRoles) => {
    return (req:Request, res:Response, next:Function) => {
        if (!req.userRole) return res.sendStatus(401);
        const roleArray = [...allowedRoles];
        const result = roleArray.find(item => item == req.userRole)
        if(!result) return res.sendStatus(401);
        next();
    }
}

export default verifyRoles;