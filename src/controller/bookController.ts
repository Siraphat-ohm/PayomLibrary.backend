import { Request, Response } from "express";
import * as fs from 'fs'
import { Book } from "../entity/Book";

const paginationBooks = async (req:Request, res:Response, next:Function) => {

    let page = 3;
    const size = 10;

    const calSkip = (page:number, size:number) => {
        return (page - 1) * size;
    }

    try {

        let data = await Book.find( {
            relations : {
                authors: true,
                categories: true,
                language: true
            },
            select : {
                authors: {
                    name: true
                },
                categories: {
                    name: true
                },
                id:true,
                title: true,
                ISBN: true,
                copies: true,
                thumbnail: true
            }
        })
        const skip = calSkip(Number(page), size);
        const take = skip + size;
        data = data.slice(skip, take);
        
        res.json(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }

}

export default { paginationBooks }