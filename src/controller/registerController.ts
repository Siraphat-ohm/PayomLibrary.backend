import { Request, Response } from "express";
import { User } from "../entity/User";
const bcrypt = require('bcrypt')

const handleRegister = async(req:Request, res:Response, next:Function) => {
    let { user, pwd } = req.body;
    try {
        let pwdHash:string = bcrypt.hashSync(pwd, 10);

        await User.insert({ userName:user, passWord:pwdHash });
        res.sendStatus(200);
    } catch (error) {
       next(error); 
    }
}

export default { handleRegister }