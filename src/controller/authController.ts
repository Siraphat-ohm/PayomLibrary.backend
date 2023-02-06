import { Request, Response } from "express";
import { User } from "../entity/User";

const handleAuth = async(req: Request, res:Response, next:Function) => {
    const cookie = req.cookies;
    console.log(!!!cookie);
    if (!!!cookie.jwt) return res.sendStatus(403);
    try {
        const foundRefresh = await User.findOne( { where : { refreshToken : cookie.jwt }})
        res.sendStatus(200);
        
    } catch(err) {
        console.log(err);
    }
}

export default { handleAuth };