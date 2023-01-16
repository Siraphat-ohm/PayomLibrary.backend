import { Request, Response } from "express";
import { User } from "../entity/User";
const bcrypt = require('bcrypt');
import TokenManager from "../token/tokenManager";
import { payload } from "../types/types";

const handleLogin = async (req:Request, res:Response, next:Function) => {
    let { user, pwd } = req.body;

    try {
        let foundUser = await User.find( { where: { userName:req.body.user }})
        const userInput : string = foundUser[0].userName
        const pwdInput : string = foundUser[0].passWord
        const role : number = foundUser[0].role
        
        const payload : payload = { user:userInput, role:role }
        const TKM = new TokenManager(payload)

        if (userInput == user && await bcrypt.compareSync(pwd, pwdInput)) {
            const accessToken = TKM.generateAcessToken()
            const refreshToken = TKM.generateRefreshToken()

            await User.update({ userName : user }, { refreshToken : refreshToken })

            res.json({ accessToken: accessToken, refreshToken: refreshToken, auth: true })
        }

    } catch (error) {
        next(error); 
    }
}

export default { handleLogin }