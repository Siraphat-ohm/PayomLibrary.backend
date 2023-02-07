import { Request, Response } from "express";
import { User } from "../entity/User";

const handleAuth = async(req: Request, res:Response, next:Function) => {
    const cookie = req.cookies;
    if (!!!cookie.jwt) return res.status(403).json({ Authenticated: false });
    try {
        const foundRefresh = await User.findOne( { where : { refreshToken : cookie.jwt }, select : { email: true, role: true}})
        res.status(200).json({ Authenticated: true, user:foundRefresh });
        
    } catch(err) {
        console.log(err);
    }
}

export default { handleAuth };