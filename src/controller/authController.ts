import { Request, Response } from "express";
import { User } from "../entity/User";

const handleAuth = async(req: Request, res:Response, next:Function) => {
    const cookie = req.cookies;
    if (JSON.stringify(cookie) == '{}') return res.json({"isLogin":false});
    try {
        const foundRefresh = await User.findOne( { where : { refreshToken : cookie.jwt }})
        
        res.json({"isLogin" : true, "user":foundRefresh.userName, "role":foundRefresh.role, "id":foundRefresh.id });
        
    } catch(err) {
        console.log(err);
    }
}

export default { handleAuth };