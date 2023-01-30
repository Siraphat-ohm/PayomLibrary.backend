import { Request, Response } from "express";
import { User } from "../entity/User";
const bcrypt = require('bcrypt')

const handleRegister = async(req:Request, res:Response, next:Function) => {
    let { user, pwd, role } = req.body;
    if(!user || !pwd) return res.status(400).json({"message": "Username and password are required"})

    const duplicate = await User.find( { where : { userName : user}});
    if(duplicate.length != 0) return res.sendStatus(409);

    try {
        let pwdHash:string = bcrypt.hashSync(pwd, 10);

        await User.insert({ userName:user, passWord:pwdHash, role:role });
        res.sendStatus(200);
    } catch (error) {
        next(error); 
    }
}

export default { handleRegister }