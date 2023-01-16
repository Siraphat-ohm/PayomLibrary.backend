import { Request, Response } from "express";
import { User } from "../entity/User";
import TokenManager from "../token/tokenManager";
import { payload } from "../types/types";

const handleRefresh = async(req:Request, res:Response, next:Function) => {

    try {
        const payload : payload = { user:req.user, role:req.role }
        const TKM = new TokenManager(payload)

        const accessToken = TKM.generateAcessToken()
        const refreshToken = TKM.generateRefreshToken()

        res.json({ accessToken: accessToken, refreshToken: refreshToken})

    } catch (error) {
        res.sendStatus(404)
    }

}

export default { handleRefresh }