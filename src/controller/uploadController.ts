import { Request, Response } from "express";
import { Book } from "../entity/Book";


const handleUpload = async(req:Request, res:Response, next:Function) => {

    try {
        
        await Book.save({ ...req.body })

        res.sendStatus(200);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(400);
    }
}

export default { handleUpload }