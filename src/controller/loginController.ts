import { Request, Response } from "express";
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import roles from "../config/roles.json"

const bcrypt = require('bcrypt');

const handleLogin = async (req:Request, res:Response, next:Function) => {
    let { user, pwd } = req.body;
    try {
        let foundUser = await User.find({
                                    where: { userName:req.body.user }
                                })

        const userInput : string = foundUser[0].userName
        const pwdInput : string = foundUser[0].passWord
        const role : string = roles[foundUser[0].role]
        
        const payload : Object = { user:userInput, role:role }

        if (userInput == user && await bcrypt.compareSync(pwd, pwdInput)) {
            //req.session.userid = foundUser[0].id;
            //req.session.username = foundUser[0].userName;
            //res.status(200).json({"message":"login success."});

            const accessToken = jwt.sign(payload, process.env.SECRET_KEY_ACESS)
            res.json({ accessToken : accessToken})
        }
    } catch (error) {
        next(error); 
    }
    
}

export default { handleLogin }