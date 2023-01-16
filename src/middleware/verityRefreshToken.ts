import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { payload } from "../types/types";

const verifyRefreshToken = (req:Request, res:Response, next:Function) => {
    const { token } = req.body
    console.log(token);
    try {
        if(!token) return res.sendStatus(401);
        jwt.verify(token, process.env.SECRET_KEY_REFRESH, (err:any, decode:payload) => {
            req.user = decode.user
            req.role = decode.role
            req.token = token
        })
        next()

    } catch(error) {
        console.log(error);
        return res.sendStatus(403)
    }

}

export default verifyRefreshToken