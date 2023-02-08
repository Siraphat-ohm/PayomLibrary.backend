import { Request, Response } from "express";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import { AuthPayload } from "../types/types";
import TokenManager from "../token/tokenManager";

const handleRefreshToken = async(req:Request, res:Response) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401); 
    const refreshToken = cookies.jwt;
    
    try {

        const foundUser = await User.findOne( { where : { refreshToken : refreshToken } })
        const TKM = new TokenManager( { userId: foundUser.id, userRole : foundUser.role} )
        
        jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH, (err:any, decode:AuthPayload) => {
            if(err) return res.sendStatus(403);
        const accessToken = TKM.generateAcessToken();
        res.json({ accessToken: accessToken}).status(200);
        
    })
    } catch(err) {
        console.log(err);
    }
    
}

export default { handleRefreshToken }