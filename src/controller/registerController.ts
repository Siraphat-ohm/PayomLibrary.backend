import { Request, Response } from "express";
import { User } from "../entity/User";
const bcrypt = require('bcrypt')

const handleRegister = async(req:Request, res:Response, next:Function) => {
    let { email, password, role } = req.body;
    if(!email || !password) return res.status(400).json({"message": "Username and password are required"})

    const duplicate = await User.find( { where : { email : email}});
    if(duplicate.length != 0) return res.sendStatus(409);

    try {
        let passwordHash: string = bcrypt.hashSync(password, 10);

        await User.insert({ email: email, password:passwordHash, role:role });
        res.sendStatus(200);
    } catch (error) {
        next(error); 
    }
}

export default { handleRegister }