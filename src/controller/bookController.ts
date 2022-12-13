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

const paginationBooks =async (req:Request, res:Response, next:Function) => {

    const page = req.params.page || 1;
    const size = 10;

    const calSkip = (page:number, size:number) => {
        return (page - 1) * size;
    }

    const calPage = (count:number, size:number) => {
        return Math.ceil(count/size);
    }

    try {
        let data = await Book.find(
            {
                select:['id'],
                skip:(calSkip(Number(page),size)),
                take:size
            }
        )
        res.json(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }

}

export default { getAllBooks, paginationBooks }