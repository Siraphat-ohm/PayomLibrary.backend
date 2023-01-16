import { Request, Response } from "express";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import roles from "../config/roles.json"
import { generateAcessToken } from "../token/tokenManager";

const bcrypt = require('bcrypt');

const handleLogin = async (req:Request, res:Response, next:Function) => {
    let { user, pwd } = req.body;
    try {
        let foundUser = await User.find( { where: { userName:req.body.user }})

        const userInput : string = foundUser[0].userName
        const pwdInput : string = foundUser[0].passWord
        const role : string = roles[foundUser[0].role]
        
        const payload : Object = { user:userInput, role:role }

        const acessToken : string = generateAcessToken(payload);
        const refreshToken : string = generateAcessToken(payload);

        if (userInput == user && await bcrypt.compareSync(pwd, pwdInput)) {
            res.json( { acessToken : acessToken, refreshToken : refreshToken, auth : true } )
        }
    } catch (error) {
        next(error); 
    }
    
}

export default { handleLogin }