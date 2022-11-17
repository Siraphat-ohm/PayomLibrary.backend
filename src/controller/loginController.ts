import { Request, Response } from "express";
import { User } from "../entity/User";

const bcrypt = require('bcrypt');

const handleLogin = async (req:Request, res:Response, next:Function) => {
    let session;
    let { user, pwd } = req.body;
    try {
        let foundUser = await User.find({
                                    where: { userName:req.body.user }
                                })
        if (foundUser[0].userName == user && await bcrypt.compareSync(pwd, foundUser[0].passWord)) {
            session = req.session;
            session.userid = foundUser[0].id;
            session.username = foundUser[0].userName;
            res.status(200).json({"message":"login success."});
        }
    } catch (error) {
       next(error); 
    }
    
}

export default { handleLogin }