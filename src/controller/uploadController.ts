import { Request, Response } from "express";
import { Author } from "../entity/Author";
import { Book } from "../entity/Book";


const handleUpload = async(req:Request, res:Response, next:Function) => {

    const { title, category, author, edition, publication_year, language, detail, amount, ISBN, page } = req.body;
    const [fname, lname] = author.split(" ")

    try {
        
        const author = new Author()
        author.fname = fname;
        author.lname= lname;
        await Author.save(author)

        const book = new Book()
        book.title = title;
        book.authors = [author];
        book.categoryId = category;
        book.edition = edition;
        book.pubYear = publication_year;
        book.language = language;
        book.copies = amount;
        book.description = detail;
        book.ISBN = ISBN;
        book.page = page;
        book.graphic = req.file.filename;
        await Book.save(book)

        res.sendStatus(200);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(400);
    }
}

export default { handleUpload }