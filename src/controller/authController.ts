import { Request, Response } from "express";


const handleAuth = (req: Request, res: Response, next: Function) => {
        console.log(req.session);
        if (req.session.username != undefined) {
            res.status(200).json({ "username" : req.session.username })
        } else {
            res.sendStatus(204);
        }
    }

export default { handleAuth }