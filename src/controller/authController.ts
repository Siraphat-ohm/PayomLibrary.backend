import { Request, Response } from "express";
import { User } from "../entity/User";

const handleAuth = async(req: Request, res:Response, next:Function) => {
    const cookie = req.cookies;
    if (JSON.stringify(cookie) == '{}') return res.json({"isLogin":false});
    try {
        const foundRefresh = await User.find( { where : { refreshToken : cookie.jwt }})
        
        res.json({"isLogin" : true, "user":foundRefresh[0].userName  });
        
    } catch(err) {
        console.log(err);
    }
}

export default { handleAuth };