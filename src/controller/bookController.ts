import { Request, Response } from "express";
import { Book } from "../entity/Book";

const getAllBooks = async(req:Request, res:Response, next:Function) => {
    
    try {
        let data = await Book.find()
        console.log(data);
        res.json(data)
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
}


export default { getAllBooks }