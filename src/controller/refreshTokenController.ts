import { Request, Response } from "express";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import { payload } from "../types/types";
import TokenManager from "../token/tokenManager";

const handleRefreshToken = async(req:Request, res:Response) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401); 
    const refreshToken = cookies.jwt;
    
    try {

        const foundUser = await User.find( { where : { refreshToken : refreshToken } })
        if(foundUser.length == 0 ) return res.sendStatus(403);
        const TKM = new TokenManager( { user: foundUser[0].userName, role : foundUser[0].role} )
        
        jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH, (err:any, decode:payload) => {
            if(err) return res.sendStatus(403);
        const accessToken = TKM.generateAcessToken();
        res.json({ accessToken: accessToken}).status(200);
        
    })
    } catch(err) {
        console.log(err);
    }
    
}

export default { handleRefreshToken }