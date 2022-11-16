import { Response } from "express";

const bcrypt = require('bcrypt');

const handleLogin = async (req:Response, res:Response) => {
    let session;
    let { user, pwd } = req.body;
    try {
        let foundUser = await User.find({
                                    where: { userName:req.body.user }
                                })
        if (foundUser[0].userName == user && await bcrypt.compareSync(pwd, foundUser[0].passWord)) {
            session = req.sessions;
            session.userid = foundUser[0].id;
            session.username = foundUser[0].userName;
            res.status(200).json({"message":"login success."});
        }
    } catch (error) {
       next(error); 
    }
    
}