import { Request, Response } from "express";
import { Any } from "typeorm";
import { Book } from "../entity/Book";
const fs = require('fs')

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

const paginationBooks = async(req:Request, res:Response, next:Function) => {

    let page = req.params.page || 1;
    const size = 10;

    const calSkip = (page:number, size:number) => {
        return (page - 1) * size;
    }

    try {
        let skip = calSkip(Number(page), size)
        let data = await Book.find(
            {
                skip:(calSkip(Number(page),size)),
                take:size
            }
        )
        
        const filename = fs.readdirSync('./uploads/')
        
        data.forEach((element, index) => {
            if (element.graphic == filename[index]) {
                data[index].graphic = fs.readFileSync(`./uploads/${filename[index]}`, { encoding : 'base64' })
            }
        });

        res.json(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }

}

const getNumberOfPages = async(req:Request, res:Response, next:Function) => {

    const calPage = (count:number, size:number) => {
        return Math.ceil(count/size);
    }

    try {
        let count = await Book.count({select:['id']})
        res.status(200).json({"pages":calPage(Number(count), 10)})
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export default { getAllBooks, paginationBooks, getNumberOfPages }