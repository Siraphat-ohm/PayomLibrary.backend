import { Request, Response } from "express";
import { User } from "../entity/User";

const handleLogout = async(req:Request, res:Response, next:Function) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(204).json( { "message":"don't have cookies" }); // No content
    const refreshToken = cookies.jwt;

    const foundUser = await User.find( { where: { refreshToken : refreshToken } })
    if(foundUser.length == 0) {
        res.clearCookie('jwt', { httpOnly : true, sameSite:"none", secure:true })
        return res.sendStatus(204).json({ "message":"not found user" });
    }

    await User.update({ refreshToken : refreshToken }, { refreshToken : ""})
    res.clearCookie('jwt', { httpOnly : true, sameSite:"none", secure:true })
    return res.status(204).json( { "message" : "clear cookies"} );

}

export default { handleLogout }