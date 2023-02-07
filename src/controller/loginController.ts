import { Request, Response } from "express";
import { User } from "../entity/User";
import TokenManager from "../token/tokenManager";
import { AuthPayload } from "../types/types";
const bcrypt = require('bcrypt');
import roles from "../config/roles.json";

const handleLogin = async (req:Request, res:Response, next:Function) => {
    let { email, password, admin } = req.body;
    if (!email || !password) return res.json({ 'message': "Username and password are required."} ).status(400)

    try {
        const role = admin ? roles.libralian : roles.student;
        let foundUser = await User.findOne( { where: { email: email, role: role }})
            
        if(!foundUser) return res.status(401).json( {"message" : "not found user"})

        const email_f : string = foundUser.email
        const password_f : string = foundUser.password
        const role_f : number = foundUser.role
        
        const AuthPayload : AuthPayload = { userId: foundUser.id , userRole:role_f }
        const TKM = new TokenManager(AuthPayload)
        
        if (await bcrypt.compareSync(password, password_f)) {
            const accessToken = TKM.generateAcessToken()
            const refreshToken = TKM.generateRefreshToken()

            const user = await User.findOne({where : { email: email_f}})
            await User.update({ email: email_f }, { refreshToken : refreshToken })
            
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: "none", secure : true, maxAge: 24 * 60 * 60 * 1000 })
            res.json({ accessToken: accessToken, isAdmin: (roles.libralian == user.role) ? true : false }).status(200);
            
        } else {
            res.json( { "massage": "user or password invalid" }).status(401);
        }
    } catch (error) {
        next(error); 
    }
}

export default { handleLogin }