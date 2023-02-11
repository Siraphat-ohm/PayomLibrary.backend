import { Request, Response } from "express";
import { Book } from "../entity/Book";
import books from "../config/books.json";
import { Author } from "../entity/Author";
import Category from "../entity/Category";
import { Language } from "../entity/Language";


const handleUpload = async(req:Request, res:Response, next:Function) => {

    try {
        for ( let book of books){
            let authors = await Author.findOne( { where: { name: book.authors }});
            if (!authors) {
                authors = new Author();
                authors.name = book.authors;
                await Author.save(authors)
            }

            let categories = await Category.findOne( { where: { name: book.category}});
            if (!categories) {
                categories = new Category();
                categories.name = book.category;
                await Category.save(categories);
            }

            let language = await Language.findOne( { where: { language: book.language }});
            if (!language){
                language = new Language();
                language.language = book.language;
                await Language.save(language);
            }
            
            await Book.save({
                copies: book.copies,
                categories: [categories],
                authors: [authors],
                title: book.title,
                description: book.description,
                page: book.page,
                pubYear: book.pubYear,
                language: language,
                ISBN: book.ISBN,
                thumbnail: book.thumbnail
            })

        }
        res.sendStatus(200);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(400);
    }
}

export default { handleUpload }