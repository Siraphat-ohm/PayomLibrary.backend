import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

type DecodeProps = {
    user: string
    role: number
}

const verifyAcessToken = (req:Request, res:Response, next:Function) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY_ACESS, (err:Error, decode: DecodeProps) => {
        if (err) return res.sendStatus(403)
        req.user = decode.user;
        req.role = decode.role;
        next();
    })
}

export default verifyAcessToken