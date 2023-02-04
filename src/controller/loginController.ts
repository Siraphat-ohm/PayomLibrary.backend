import { Request, Response } from "express";
import { User } from "../entity/User";
const bcrypt = require('bcrypt');
import TokenManager from "../token/tokenManager";
import { AuthPayload } from "../types/types";

const handleLogin = async (req:Request, res:Response, next:Function) => {
    let { user, pwd } = req.body;

    if (!user || !pwd) return res.json({ 'message' : "Username and password are required."} ).status(400)

    try {
        let foundUser = await User.findOne( { where: { userName:req.body.user }})

        if(!foundUser) return res.status(401).json( {"message" : "not found user"})

        const userInput : string = foundUser.userName
        const pwdInput : string = foundUser.passWord
        const role : number = foundUser.role
        
        const AuthPayload : AuthPayload = { userId: foundUser.id , userRole:role }
        const TKM = new TokenManager(AuthPayload)

        if (await bcrypt.compareSync(pwd, pwdInput)) {
            const accessToken = TKM.generateAcessToken()
            const refreshToken = TKM.generateRefreshToken()

            await User.update({ userName : user }, { refreshToken : refreshToken })

            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: "none", secure : true, maxAge: 24 * 60 * 60 * 1000 })
            res.json({ accessToken : accessToken, role:role })
        } else {
            res.json( { "massage" : "user or password invalid" }).status(401);
        }

    } catch (error) {
        next(error); 
    }
}

export default { handleLogin }