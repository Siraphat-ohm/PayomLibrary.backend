import { Request, Response } from "express";
import { Author } from "../entity/Author";
import { Book } from "../entity/Book";
import { Book_author } from "../entity/Book_author";


const handleUpload = async(req:Request, res:Response, next:Function) => {

    const {title, category, author, edition, publication_year, page, language, detail, amount, ISBN} = req.body;
    
    try {

        let allAuthor:Array<Author>  = await Author.find({select: { name: true }})
        const arrAuthor:Array<string> = allAuthor.map(item => item.name)

        if (!(arrAuthor.includes(author))) {
            await Author.insert({
                name:author
            })
        }
        await Book.insert({
            title:title,
            category_id:category,
            edition:edition,
            publication_year:publication_year,
            page:page,
            language:language,
            detail:detail,
            copies_owned:amount,
            ISBN:ISBN,
            graphic: req.file.filename
        })

        const author_id = await Author.find({select : {author_id:true}, where:{name:author}})
        const book_id = await Book.find({select: {id:true}, where:{title: title}})

        await Book_author.insert({
            book_id:Number(book_id[0].id),
            author_id:Number(author_id[0].author_id)
        })
        

        res.sendStatus(200);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(400);
    }
}

export default { handleUpload }