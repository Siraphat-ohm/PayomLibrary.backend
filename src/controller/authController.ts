import { Request, Response } from "express";
import { User } from "../entity/User";

const handleAuth = async(req: Request, res:Response, next:Function) => {
    const cookie = req.cookies;
    if (JSON.stringify(cookie) == '{}') return res.sendStatus(201);
    try {
        const foundRefresh = await User.find( { where : { refreshToken : cookie.jwt }})
        if (foundRefresh.length != 0) return res.sendStatus(200);
        res.sendStatus(201);
        
    } catch(err) {
        console.log(err);
    }
}

export default { handleAuth };