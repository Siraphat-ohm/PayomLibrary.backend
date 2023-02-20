import { Request, Response } from "express";
import { Book } from "../entity/Book";

const paginationBooks = async (req:Request, res:Response, next:Function) => {

    let page = req.params.page;
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

const getPage = async(req: Request, res: Response, next:Function) => {
    try {
        const data = await Book.count()
        const page = Math.ceil(data/10);
        res.json(
            page
        )
    } catch (error) {
        res.send(404);
    }

}

const getBookById = async(req: Request, res: Response, next:Function) => {
    const id = req.params.id 
    console.log(id)

    try {
        const data = await Book.findOne( { where: { id: id }, relations: { 
                                                    authors: true, 
                                                    categories: true, 
                                                    language: true 
                                                } } )
        const book = {
            id: data.id,
            title: data.title,
            description: data.description,
            ISBN: data.ISBN,
            pubYear: data.pubYear,
            page: data.page,
            amount: data.copies,
            thumbnail: data.thumbnail,
            authors: data.authors.map(item => item.name),
            category: data.categories.map(item => item.name),
            language: data.language.language
        }
        res.json( book )
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
}

export default { paginationBooks, getPage, getBookById }