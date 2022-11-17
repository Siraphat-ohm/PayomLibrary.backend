import { Request, Response } from "express";


const handleLogout = (req:Request, res:Response, next:Function) => {
    req.session.destroy((err) => {}) //destroy session .
    res.json({"session":req.session})
}

export default { handleLogout }